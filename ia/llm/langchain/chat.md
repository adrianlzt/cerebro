https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/04-langchain-chat.ipynb

```
from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    SystemMessage,
    HumanMessage,
    AIMessage
)

chat = ChatOpenAI(
    openai_api_key=OPENAI_API_KEY,
    temperature=0,
    model='gpt-3.5-turbo'
)

messages = [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="Hi AI, how are you today?"),
    AIMessage(content="I'm great thank you. How can I help you?"),
    HumanMessage(content="I'd like to understand string theory.")
]

# Preguntamos a gpt sobre la teoría de cuerdas, pasándole también el resto de contexto (la conversación)
res = chat(messages)

# Aqui metemos la respuesta al histórico de la conversación
messages.append(res)

# Y volvemos a preguntar de nuevo
prompt = HumanMessage(
    content="Why do physicists believe it can produce a 'unified theory'?"
)
# add to messages
messages.append(prompt)

# send to chat-gpt
res = chat(messages)
```
