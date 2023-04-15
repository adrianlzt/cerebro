https://app.pinecone.io/
https://www.pinecone.io/learn/vector-database/

A vector database indexes and stores vector embeddings for fast retrieval and similarity search, with capabilities like CRUD operations, metadata filtering, and horizontal scaling.

Vector databases excel at similarity search, or “vector search.” Vector search enables users to describe what they want to find without having to know which keywords or metadata classifications are ascribed to the stored objects.


Freemium, índices borrados tras 7 días sin uso.

Ejemplo de uso:
https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/05-langchain-retrieval-augmentation.ipynb


```
import pinecone

# find API key in console at app.pinecone.io
YOUR_API_KEY = getpass("Pinecone API Key: ")
# find ENV (cloud region) next to API key in console
YOUR_ENV = input("Pinecone environment: ")

index_name = 'langchain-retrieval-augmentation'
pinecone.init(
    api_key=YOUR_API_KEY,
    environment=YOUR_ENV
)

# we create a new index
pinecone.create_index(
    name=index_name,
    metric='dotproduct',
    dimension=# 1536 # dim of text-embedding-ada-002
)

index = pinecone.GRPCIndex(index_name)
```
