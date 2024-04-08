"use server";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { Index } from "@upstash/vector";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";

interface vectorType {
  id: string;
  score: number;
  metadata: {
    text: string;
  };
}

type splitResponseType = {
  pageContent: string;
  metadata: {
    loc: {
      lines: {
        from: number;
        to: number;
      };
    };
  };
};

type PageData = {
  pageContent: string;
  metadata: {
    source: string;
    pdf: {
      version: string;
      info: {
        PDFFormatVersion: string;
        IsAcroFormPresent: boolean;
        IsXFAPresent: boolean;
        Title: string;
        Producer: string;
      };
      metadata: any;
      totalPages: number;
    };
    loc: {
      pageNumber: number;
      lines: {
        from: number;
        to: number;
      };
    };
  };
};

const index = new Index({
  url: `${process.env.UPSTASH_URL}`,
  token: `${process.env.UPSTASH_TOKEN}`,
});

export async function doPDF(fileUrl: string) {
  const data = await ParsePdf(fileUrl);
  const parsedData: PageData[] = JSON.parse(data);

  // console.log("parsedData", parsedData);

  for (const item of parsedData) {
    const embeddings: number[] = await CreateEmbedding(item.pageContent);
    // console.log("embeddings", embeddings);
    const d = await storeIndex(embeddings, item.pageContent);
    // console.log("stored in upstash", d);
    // console.log("embedding -", embeddings);
  }
}

export async function ParsePdf(fileUrl: string) {
  // temp.pdf
  const response = await fetch(fileUrl);
  const file_name = "temp.pdf";
  const buffer = await response.buffer();
  const filePath = path.resolve(__dirname, file_name);
  fs.writeFileSync(filePath, buffer);

  const pdfLoader = new PDFLoader(filePath,{
    parsedItemSeparator: " ",
  });
  const splitDocuments = await pdfLoader.loadAndSplit();

  // const docs = await pdfLoader.load();

  // console.log(splitDocuments[0].pageContent);

  // return docs;
const a = await index.reset()
console.log('reset', a)
  
  return JSON.stringify(splitDocuments);
  // console.log(splitDocuments);
}

export async function CreateEmbedding(text: string) {
  try {
    const response = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: `${text}`,
      }),
    });

    const embedding = await response.json();
    const vector: number[] = embedding.embedding;
    // console.log(vector);

    return vector;
  } catch (error) {
    console.error("Error:", error);
  }
  return [];
}

export async function storeIndex(vector: number[], metadata: string) {
  const random_id = uuidv4();

  await index.upsert({
    id: random_id,
    vector: vector,
    metadata: {
      text: metadata,
    },
  });

  return random_id;
}

export async function searchIndex(vector: number[]) {
  const response = await index.query({
    vector: vector,
    topK: 2, // change this, to get more nearest neighbors & map them.
    includeMetadata: true,
  });

  const mappedResponse: vectorType[] = response.map((item) => ({
    id: item.id.toString(),
    score: item.score,
    metadata: item.metadata as { text: string },
  }));

  return mappedResponse;
}
