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

Las utility chains parece que funcionan pasando nuestra pregunta a un LLM con un prompt específico, esperando una respuesta determinada que luego se usa con otra aplicación.


# LLMMathChain
from langchain.chains import LLMMathChain
llm = OpenAI(temperature=0)
llm_math = LLMMathChain(llm=llm, verbose=True)
llm_math("What is 13 raised to the .3432 power?")

Lo que hace es generar un prompt con unos few-shots para pedirle al modelo un código python que resuelva el problea matemático.
Luego coge el output y lo ejecuta en un repl de python.


# TransformChain
Creamos una función por donde pasamos el input.
def transform_func(inputs: dict) -> dict:
  text = inputs["text"]
  ...
  return {"output_text": text}

clean_extra_spaces_chain = TransformChain(input_variables=["text"], output_variables=["output_text"], transform=transform_func)


# SequentialChain
sequential_chain = SequentialChain(chains=[clean_extra_spaces_chain, style_paraphrase_chain], input_variables=['text', 'style'], output_variables=['final_output'])

# Hub chains
from langchain.chains import load_chain
llm_math_chain = load_chain('lc://chains/llm-math/chain.json')
print(llm_math_chain.prompt.template)
