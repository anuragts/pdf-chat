import { StreamingTextResponse } from "ai";
import { Ollama } from "@langchain/community/llms/ollama";
import { searchIndex, CreateEmbedding } from "@/app/action";

function fromAsyncGenerator<T>(generator: AsyncGenerator<T, void, unknown>) {
  return new ReadableStream<T>({
    async start(controller) {
      for await (const value of generator) {
        controller.enqueue(value);
      }
      controller.close();
    },
  });
}

export async function* Chat(question: string) {
  const ollama = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "mistral",
  });

  // console.log("question", question);

  const questionVector = await CreateEmbedding(question);

  const Index = await searchIndex(questionVector);

  // Concatenate all metadata text
  const allMetadata = Index.map((item) => item.metadata.text).join(" ");

  // console.log("All metadata text:", allMetadata);

  const prompt = `So you are chat with pdf bot you'll be provided with a question and context, 
  if context is not provided simply return you don't know.
  Here is the context - ${allMetadata}, 
  here is your question ${question}
  `;

  const stream = await ollama.stream(`${prompt}`);

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    // // console.log(chunk);
    yield chunk;
  }

  // console.log(chunks.join(""));
}

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  //   // console.log("messages", messages);

  // Get the content of the last message
  const lastMessage = messages[messages.length - 1].content;

  // console.log("lastMessage", lastMessage);

  // Request the Chat function for the response based on the prompt
  const asyncGenerator = Chat(lastMessage);

  //   // console.log("asyncIterator", asyncGenerator);

  // Convert AsyncGenerator to ReadableStream
  const stream = fromAsyncGenerator(asyncGenerator);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
