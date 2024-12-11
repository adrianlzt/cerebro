<https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/06-langchain-agents.ipynb>

LangGraph

Agents are like "tools" for LLMs. They allow a LLM to access Google search, perform complex calculations with Python, and even make SQL queries.
Agents use an LLM to determine which actions to take and in what order. An action can either be using a tool and observing its output, or returning to the user.

Using one of langchain's pre-built agents involves three variables:

- defining the tools
- defining the llm
- defining the agent type

En el prompt se pasará una lista de tools disponibles, ejemplo:
"""
Answer the following questions as best you can. You have access to the following tools:

Calculator: Useful for when you need to answer questions about math.
Stock DB: Useful for when you need to answer questions about stocks and their prices.
"""

Se le pedirá que razone que necesita y lo saque como:
"""
Action: Stock DB
Action Input: Stock prices of 'ABC' and 'XYZ' on January 3rd and January 4th
"""

En este punto langchain verá que LLM quiere usar una tool, así que pasará el input a dicha tool.

# Definir un agente

conversational_agent = initialize_agent(
agent='conversational-react-description',
tools=tools,
llm=llm,
verbose=True,
max_iterations=3,
memory=memory,
)

## Memoria

En el prompt se va pasando un histórico de la conversación.
Pero con un ejemplo sencillo que he hecho, en el histórico se veía mi pregunta pero la respuesta de la IA no era completa, solo:
"AI: Is there anything else I can help you with?"
Al no tener contexto, no contestó bien a mi pregunta.

# Definir una tool

Ejemplo de una tool que habla con una bbdd SQL.

```
from langchain.agents import Tool
from langchain.sql_database import SQLDatabase
from langchain.chains import SQLDatabaseChain

db = SQLDatabase(engine) # falta la inicialización de este engine
sql_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)

sql_tool = Tool(
    name='Stock DB',
    func=sql_chain.run,
    description="Useful for when you need to answer questions about stocks " \
                "and their prices."
)
```
