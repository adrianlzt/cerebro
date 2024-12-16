Listado de tools ya implementadas <https://python.langchain.com/api_reference/community/tools.html>

# Definir una tool

Ejemplo de una tool que habla con una bbdd SQL.

```python
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

# Tavily / internet search

```python
from langchain_community.tools.tavily_search import TavilySearchResults

tool = TavilySearchResults(max_results=2)
tools = [tool]
tool.invoke("What's a 'node' in LangGraph?")
```

# Añadir las tools a un LLM

```python
# lets the LLM know the correct JSON format to use if it wants to use our search engine.
llm = ChatAnthropic().bind_tools(tools)
```

Cuando hacemos ese `bind_tools`, estamos llamando a una función específicamente creada para cada LLM que pasará las herramientas según la API que tenga definido ese LLM. Ejemplo para Anthropic: <https://github.com/langchain-ai/langchain/blob/a0534ae62a3a9022a8ec7148ea6b63e9f5487d02/libs/partners/anthropic/langchain_anthropic/chat_models.py#L815>
