https://www.pinecone.io/learn/langchain-conversational-memory/#:~:text=the%20ConversationChain.-,ConversationChain,-We%20can%20start
https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/03-langchain-conversational-memory.ipynb

Comparativa entre distintos métodos de mantener la memoria
https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/03a-token-counter.ipynb

https://python.langchain.com/en/latest/modules/memory/how_to_guides.html

Mirar también chat.md


# ConversationBufferMemory
https://www.pinecone.io/learn/langchain-conversational-memory/#:~:text=%7Bhistory%7D%20parameter.-,ConversationBufferMemory,-(Follow%20along%20with

langchain va almacenando el histórico de la conversación y se lo pasa cada vez que llamamos a conversation_buf.

```
from langchain.chains.conversation.memory import ConversationBufferMemory

conversation_buf = ConversationChain(
    llm=llm,
    memory=ConversationBufferMemory()
)
conversation_buf("Good morning AI!")
conversation_buf("foo bar")
```

Podemos obtener el buffer de la conversación con:
print(conversation_buf.memory.buffer)

Si queremos ir contando los tokens:
https://gist.github.com/jamescalam/b6b645e048071434174b3ef4daccafd0#file-langchain-03-buffer-memory-conversation-ipynb



# ConversationSummaryMemory
https://www.pinecone.io/learn/langchain-conversational-memory/#:~:text=help%20remedy%20this.-,ConversationSummaryMemory,-Using%20ConversationBufferMemory%2C%20we

Se va usando el LLM para hacer un resumen de la conversación, que es lo que se pasa como histórico.



# ConversationBufferWindowMemory
https://www.pinecone.io/learn/langchain-conversational-memory/#:~:text=context%20window%20limits.-,ConversationBufferWindowMemory,-The%20ConversationBufferWindowMemory%20acts

Sliding window de memoria. Solo se acordará de las últimoa n iteraciones.


# ConversationSummaryBufferMemory
https://www.pinecone.io/learn/langchain-conversational-memory/#:~:text=are%20other%20options.-,ConversationSummaryBufferMemory,-The%20ConversationSummaryBufferMemory%20is

Usa la técnica de resumir, para almacenar lo más antiguo, y también guarda las últimoas n iteraciones más recientes.


# ConversationKnowledgeGraphMemory
https://python.langchain.com/en/latest/modules/memory/types/kg.html
https://apex974.com/articles/explore-langchain-support-for-knowledge-graph

Parece que mantiene un grafo de conocimiento (usa networkx), pasando al modelo los datos que considera oportunos en cada momento.
Usa el LLM para hacer la extracción de tripletas (sujeto, predicado, objeto).
Luego le puede pasar esa información como contexto cuando le preguntemos algo.

Al preguntarle algo genera otro prompt para extraer la entity. La busca en el grafo y mete la información relacionada como contexto.
Solo busca sujetos. Si la pregunta es respecto a un objeto no cogerá la información.
https://github.com/hwchase17/langchain/blob/master/langchain/chains/graph_qa/base.py#L68

Al final parece que es extraer la información útil y dejarla en un formato sencillo.

Podemos añadir nuestras propias tripletas:
graph.add_triple(KnowledgeTriple('Google', '$300 Million', 'invests'))

Podemos exportar el grafo en formato .gml
Estos grafos podemos visualizarlos con graph-tool (https://graph-tool.skewed.de/) aur/python-graph-tool

https://github.com/hwchase17/langchain/blob/master/langchain/graphs/networkx_graph.py
Podemos también acceder al grafo de networkx: graph._graph



# ConversationEntityMemory
https://python.langchain.com/en/latest/modules/memory/types/entity_summary_memory.html

Usa LLM para ir extrayendo información de las "entities" del chat y lo pasa cuando es necesario.

Similar al ConversationKnowledgeGraphMemory, pero almacenado parejas de:
subject: contexto
