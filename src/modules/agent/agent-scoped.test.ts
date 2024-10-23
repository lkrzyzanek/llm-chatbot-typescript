import initAgent from "./agent";
import { config } from "dotenv";
import { Embeddings } from "@langchain/core/embeddings";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Runnable } from "@langchain/core/runnables";
import { Neo4jGraph } from "@langchain/community/graphs/neo4j_graph";
import { close } from "../graph";
import {ChatOllama, OllamaEmbeddings} from '@langchain/ollama';

describe("Langchain Agent", () => {
  let llm: BaseChatModel;
  let embeddings: Embeddings;
  let graph: Neo4jGraph;
  let executor: Runnable;

  beforeAll(async () => {
    config({ path: ".env.local" });

    graph = await Neo4jGraph.initialize({
      url: process.env.NEO4J_URI as string,
      username: process.env.NEO4J_USERNAME as string,
      password: process.env.NEO4J_PASSWORD as string,
      database: process.env.NEO4J_DATABASE as string | undefined,
    });

    llm = new ChatOllama({
      model: "llama3.2"
    });

    embeddings = new OllamaEmbeddings({
      model: "llama3.2"
    });
      
    executor = await initAgent(llm, embeddings, graph);
  });

  afterAll(async () => {
    await graph.close();
    await close();
  });

  describe("Scoping", () => {
    it("should refuse to answer a question not related to movies", async () => {
      const sessionId = "agent-rag-1";
      const input = "Who is the CEO of Neo4j?";

      const output = await executor.invoke(
        {
          input,
        },
        {
          configurable: {
            sessionId,
          },
        }
      );

      expect(output).toContain("ask a question");
    });
  });
});
