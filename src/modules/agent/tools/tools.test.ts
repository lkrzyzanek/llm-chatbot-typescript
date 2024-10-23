import initTools from ".";
import {ChatOllama, OllamaEmbeddings} from '@langchain/ollama';
import { Neo4jGraph } from "@langchain/community/graphs/neo4j_graph";

describe("Tool Chain", () => {
  it("should return two tools", async () => {
    const graph = await Neo4jGraph.initialize({
      url: process.env.NEO4J_URI as string,
      username: process.env.NEO4J_USERNAME as string,
      password: process.env.NEO4J_PASSWORD as string,
      database: process.env.NEO4J_DATABASE as string | undefined,
    });

    const llm = new ChatOllama({
      model: "llama3.2"
    });

    const embeddings = new OllamaEmbeddings({
      model: "llama3.2"
    })

    const tools = await initTools(llm, embeddings, graph);

    expect(tools).toBeDefined();
    expect(tools.length).toBeGreaterThanOrEqual(2);

    await graph.close();
  });
});
