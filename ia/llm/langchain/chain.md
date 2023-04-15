https://python.langchain.com/en/latest/modules/chains.html
https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/02-langchain-chains.ipynb

Pipiline de primitivas o más chains. Cada step trabaja con el resultado anterior.

Hay distintos tipos de chains: algunas
Generic Chains: chains that are used as building blocks for other chains but cannot be used out of the box on their own
Utility Chains: chains that are usually used to extract a specific answer from a llm with a very narrow purpose and are ready to be used out of the box.
Combine Documents chains
Generic Functionality: Covers both generic chains (that are useful in a wide variety of applications) as well as generic functionality related to those chains.
Index-related Chains: Chains related to working with indexes.
Otras


# LLMMathChain
from langchain.chains import LLMMathChain
llm = OpenAI(temperature=0)
llm_math = LLMMathChain(llm=llm, verbose=True)
llm_math("What is 13 raised to the .3432 power?")
