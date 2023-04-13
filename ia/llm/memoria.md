Parece que el esquema típico para dar "memoria" a los LLM es usar embeddings.
Se parsea la información que queremos tener accesible generando embeddings por cada párrafo (por ejemplo).
Esos embeddings luego se almacenan en bases de datos habilitadas para tal fin (https://www.pinecone.io/, vector DB).

Cuando preguntamos algo al LLM, este extrae las palabras claves, hace el embedding y busca en la DB.
Luego pone al comienzo del prompt toda la información encontrada y pide al LLM que conteste basándose en esa información.

Por ejemplo, el desarrollador del búscador phind dice (https://news.ycombinator.com/item?id=35545042):
Pregunta: I'd love to know more about how you pull in relevant text from web results for it to use in answers.

Respuesta: We've built out a decently complex pipeline for this, but a lot of the magic has to do with the specific embedding model we've trained to know what text is relevant to feed in and what text isn't.
