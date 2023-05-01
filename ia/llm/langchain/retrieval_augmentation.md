https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/05-langchain-retrieval-augmentation.ipynb
https://github.com/pinecone-io/examples/blob/master/generation/langchain/handbook/xx-langchain-chunking.ipynb
Guía de como dividir información para almacenarla en una bbdd para luego poder consultarla
Mirar document_loaders.md para distintos helpers para cargar info.

La idea principal es poder tener una base de datos de información fuera del LLM que será consultada cuando sea necesario.
Al realizar una pregunta, extraeremos las key words y buscaremos que textos tienen relación.
Estos textos los añadiremos al prompt como contexto.


Primero debemos obtener la información que queremos.
Luego la troceamos en bloques (usamos RecursiveCharacterTextSplitter para poder dividir el texto sin cortar líneas).
Para cada bloque cremos un embedding (vector que representa el contenido del texto).
Almacenamos los vectores en una base de datos de vectores, pinecone (SaaS) parece que es la más típica, en esa bbdd almacenamos también metadata con el texto codificado y datos de donde se sacó la info (por ejemplo).
Con esta información indexada, ahora ya podemos coger una pregunta, crear un embedding y enviarlo a pinecone para que nos de los N artículos más relacionados.

query = "who was Pele?"

vectorstore.similarity_search(
    query,  # our search query
    k=3  # return 3 most relevant docs
)

Si queremos usar esto para GQA (generative Q&A) es generar un prompt:

"""
Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

DATOS OBTENIDOS DE LA VECTORDB

Question: LA PREGUNTA DEL USUARIO
Helpful Answer:
"""
