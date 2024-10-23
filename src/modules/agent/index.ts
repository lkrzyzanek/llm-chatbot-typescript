import {ChatOllama, OllamaEmbeddings} from '@langchain/ollama';
import initAgent from "./agent";
import { initGraph } from "../graph";
import { sleep } from "@/utils";

// tag::call[]
export async function call(input: string, sessionId: string): Promise<string> {
  const llm = new ChatOllama({
    model: "llama3.2"
  });
    
  const embeddings = new OllamaEmbeddings({
    model: "llama3.2"
  });
  // Get Graph Singleton
  const graph = await initGraph();
  
  const agent = await initAgent(llm, embeddings, graph);
  const res = await agent.invoke({ input }, { configurable: { sessionId } });
  
  return res;
}
// end::call[]
