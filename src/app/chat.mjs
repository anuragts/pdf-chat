import { Ollama } from "@langchain/community/llms/ollama";

export async function Chat(question) {
  const ollama = new Ollama({
    baseUrl: "http://localhost:11434", // Default value
    model: "mistral", // Default value
  });

  const stream = await ollama.stream(`${question}`);

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    console.log(chunk);
  }

  const data = chunks.join("");

  console.log(data);

  return data;
}

export async function CreateEmbedding(text) {
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

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

CreateEmbedding("What is python?");

// Chat("What is python and who made it")
