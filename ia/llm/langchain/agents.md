<https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/06-langchain-agents.ipynb>

Ejemplo multiagent: <https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/multi_agent/multi-agent-collaboration.ipynb>

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

# Grafo

## Estado del grafo

<https://langchain-ai.github.io/langgraph/reference/graphs/#langgraph.graph.message.add_messages>

```python
class State(TypedDict):
    messages: Annotated[list, add_messages]


graph_builder = StateGraph(State)
```

## Añadir nodos

El esquema de los nodos es recibir el `state` como input y devolver ese `state` modificado.

```python
def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}


# "chatbot" es el nombre del nodo.
# El segundo argumento es la función asociada a ese nodo
graph_builder.add_node("chatbot", chatbot)
```

## Enlazar nodos / edges

Debemos definir el inicio del grafo haciendo un _edge_ desde el nodo `START`.

```python
graph_builder.add_edge(START, "chatbot")
```

Similar para terminar:

```python
graph_builder.add_edge("chatbot", END)
```

## Crear / compilar el grafo

Una vez definido debemos compilar el grafo:

```python
graph = graph_builder.compile()
```

Podemos mostrar el grafo con ascii art instalando:

```bash
pip install grandalf
```

Y haciendo:

```python
print(graph.get_graph().draw_ascii())
```

## Usar el grafo

```python
e = graph.stream({"messages": [("user", "hola, como te llamas?")]})
list(e)
```

`e` es un generador, usamos list para extraer todos los eventos.

# Definir un agente

```python
conversational_agent = initialize_agent(
  agent='conversational-react-description',
  tools=tools,
  llm=llm,
  verbose=True,
  max_iterations=3,
  memory=memory,
)
```

## Memoria

En el prompt se va pasando un histórico de la conversación.
Pero con un ejemplo sencillo que he hecho, en el histórico se veía mi pregunta pero la respuesta de la IA no era completa, solo:
"AI: Is there anything else I can help you with?"
Al no tener contexto, no contestó bien a mi pregunta.
