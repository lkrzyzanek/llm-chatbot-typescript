import {ChatOllama, OllamaEmbeddings} from '@langchain/ollama';

export const llm = new ChatOllama({
  model: "llama3.2"
});

export const embeddings = new OllamaEmbeddings({
  model: "llama3.2"
});
