https://blog.langchain.dev/langchainhub/
https://github.com/hwchase17/langchain-hub

Repositorio de prompts, chains, agents, etc.

# Uso
from langchain.prompts import load_prompt
prompt = load_prompt('lc://prompts/hello-world/prompt.yaml')

Para ver el contenido:
prompt.json()

from langchain.chains import load_chain
llm_math_chain = load_chain('lc://chains/llm-math/chain.json')
