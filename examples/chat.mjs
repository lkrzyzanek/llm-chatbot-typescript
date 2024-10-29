/* eslint-disable max-len */
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama';

export const llm = new ChatOllama({
  model: "llama3.2"
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a surfer dude, having a conversation about the surf conditions on the beach. Respond using surfer slang."],
  ["system", "{context}"],
  ["human", "{question}"]
])
const parser = new StringOutputParser();

const chain = RunnableSequence.from([prompt, llm, parser]);

const current_weather =
{
  "surf": [
    { "beach": "Fistral", "conditions": "6ft waves and offshore winds" },
    { "beach": "Polzeath", "conditions": "Flat and calm" },
    { "beach": "Watergate Bay", "conditions": "3ft waves and onshore winds" }
  ]
};

const embedding_provider = new OllamaEmbeddings({
  model: "llama3.2",
});

const main = async () => {
  // tag::invoke[]
  const response = await chain.invoke({
    question: "What is the weather like on Watergate Bay?",
    context: JSON.stringify(current_weather),
    // content: "",
  });

  console.log(response);
  // end::invoke[]
    
  
};
  
main();