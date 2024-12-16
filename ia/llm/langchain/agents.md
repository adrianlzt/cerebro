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

Podemos usar `invoke` o `stream`.
`invoke` nos devolverá el resultado directamente.
`stream` nos devolverá un generador.

```python
e = graph.stream({"messages": [("user", "hola, como te llamas?")]})
list(e)
```

`e` es un generador, usamos list para extraer todos los eventos.

# Herramientas

Las herramientas serán nodos del grafo.

```python
from langgraph.prebuilt import ToolNode, tools_condition
tool_node = ToolNode(tools=[tool])
```

Para saltar a esas herramientas meteremos un _edge condicional_, que mirará el el LLM ha contestado con que necesita usar una herramienta.
En ese caso, el edge condicional saltará al nodo herramienta.

Aquí definimos un edge desde el chatbot hacia tools o hacia END. La función `route_tools` será quien tome la decisión.

```python
graph_builder.add_conditional_edges("chatbot", tools_condition)
```

También tendremos que definir como volver del nodo tools:

```python
graph_builder.add_edge("tools", "chatbot")
```

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

# Memoria

<https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-3-adding-memory-to-the-chatbot>

Almacenar (checkpoint) el estado del grafo (State), según va pasando por los nodos.

Podemos almacenar la memoria en RAM, sqlite, postgres:

```python
from langgraph.checkpoint.memory import MemorySaver, SqliteSaver, PostgresSaver
...
graph = graph_builder.compile(checkpointer=memory)
```

Para usar la memoria tenemos que definirle un `thread_id`

```python
graph.invoke({"messages": [("user", "what is the normal color of the tomates. Just one word")]}, {"configurable": {"thread_id": "1"}})
```

Mientras mantengamos el mismo `thread_id`, se pasará la conversación completa al LLM cada vez que lo invoquemos.

Podemos ver el checkpoint para un thread_id determinado con:

```python
snapshot = graph.get_state({"configurable": {"thread_id": "1"}})
snapshot.next # siguiente nodo a procesar, excepto si ya estábamos en "END"
```

# Human-in-the-loop

<https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-4-human-in-the-loop>

En esta parte lo desarrollan un poco más, metiendo un nodo tipo humano con su interrupt:
<https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-6-customizing-state>

Podemos usar `interrupt` al compilar el grafo para decirle que se espere a intervención humana.

```python
graph = graph_builder.compile(
    checkpointer=memory,
    # This is new!
    interrupt_before=["tools"],
    # Note: can also interrupt __after__ tools, if desired.
    # interrupt_after=["tools"]
)
```

En este caso, si el LLM decide que va a usar el nodo de tools, el grafo se dentendrá ahí.
Podremos consultar la memoria cual es el siguiente nodo que quiere ejecutar con `snapshot.next`.
Podemos ver que tool quiere usar y como con:

```python
snapshot.values['messages'][-1].tool_calls
```

Si queremos continuar con el grafo, pasaremos un `None`:

```python
graph.invoke(None, {"configurable": {"thread_id": "2"}})
```

## Modificar el state

<https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-5-manually-updating-the-state>

Un caso típico del Human-in-the-loop es modificar el estado, por ejemplo para simular que se ha usado la herramienta y el resultado que hubiese dado.

Podemos hacerlo con `graph.update_state`

```python
from langchain_core.messages import AIMessage, ToolMessage, HumanMessage
graph.update_state({"configurable": {"thread_id": "2"}}, {"messages": [ToolMessage(content="1 4 8 9 10 and 14", tool_call_id='9f7dc6ed-68be-4242-b1b6-0434b074b72a')]})
```

Hacer un update_state simula un step.
`update_state` se comporta como si hubiese sido un nodo más del grafo.
Si en el grafo no tenemos ese nodo definido, no tendremos un next node al que ir.
Pero podemos simular que `update_state` es un nodo determinado, usando `as_node="nodo"`
Con esto conseguiremos que se siga el flujo del grafo.

Si usamos `update_state` para modificar los `messages`, dependerá de como hayamos configurado ese parámetro, de como se actuará.
Si tenemos definido así el State:

```python
class State(TypedDict):
    messages: Annotated[list, add_messages]
```

Se hará un append a la lista de mensajes.

Si queremos modificar un mensaje podemos especificar el id del mensaje:

```python
graph.update_state({"configurable": {"thread_id": "2"}}, {"messages": [HumanMessage(content="search in internet the euromillon winner number of the 2023/03/21",id='56e9a015-ed2d-4e7d-be94-c4c68db58b6d')]}, as_node="__start__")
```

# Time travel

<https://langchain-ai.github.io/langgraph/tutorials/introduction/#part-7-time-travel>

Podemos ir a un checkpoint del pasado, hacer modificaciones y volver a ejecutar desde ahí.

Para iterar por los checkpoints anteriores:

```python
for state in graph.get_state_history(config):
  ...
  to_replay = state
```

Suponiendo que guardamos en `to_replay` el checkpoint desde el que queremos partir, podemos reanudar el flujo con:

```python
for event in graph.stream(None, to_replay.config, stream_mode="values"):
```
