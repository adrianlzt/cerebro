https://www.pinecone.io/learn/langchain-conversational-memory/#:~:text=the%20ConversationChain.-,ConversationChain,-We%20can%20start

Comparativa entre distintos métodos de mantener la memoria
https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/03a-token-counter.ipynb


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

Parece que mantiene un grafo de conocimiento, pasando al modelo los datos que considera oportunos en cada momento.


# ConversationEntityMemory
https://python.langchain.com/en/latest/modules/memory/types/entity_summary_memory.html

Usa LLM para ir extrayendo información de las "entities" del chat y lo pasa cuando es necesario.
