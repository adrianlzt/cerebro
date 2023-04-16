Parametric knowledge — the knowledge mentioned above is anything that has been learned by the model during training time and is stored within the model weights (or parameters).

Source knowledge — any knowledge provided to the model at inference time via the input prompt.


Mirar como usarlo en prompt_engineering.md


En los modelos orientado a chat, en cada llamada a la API tenemos que pasar todo el histórico del chat, esta es la manera que tiene de acordarse
de lo que estamos hablando.



Parece que el esquema típico para dar "memoria" a los LLM es usar embeddings.
Se parsea la información que queremos tener accesible generando embeddings por cada párrafo (por ejemplo).
Esos embeddings luego se almacenan en bases de datos habilitadas para tal fin (https://www.pinecone.io/, vector DB).

Cuando preguntamos algo al LLM, este extrae las palabras claves, hace el embedding y busca en la DB.
Luego pone al comienzo del prompt toda la información encontrada y pide al LLM que conteste basándose en esa información.

Por ejemplo, el desarrollador del búscador phind dice (https://news.ycombinator.com/item?id=35545042):
Pregunta: I'd love to know more about how you pull in relevant text from web results for it to use in answers.

Respuesta: We've built out a decently complex pipeline for this, but a lot of the magic has to do with the specific embedding model we've trained to know what text is relevant to feed in and what text isn't.


ChatPDF parece que hace lo mismo:
Why can't ChatPDF see all PDF pages?
For each answer, ChatPDF can look at only a few paragraphs from the PDF at once. These paragraphs are the most related to the question. ChatPDF might say it can't see the whole PDF or mention just a few pages because it can view only paragraphs from those pages for the current question.


AutoGPT detalla que se hace un poco de overlap entre los chunks:
each document is split into chunks of a specified maximum length with a specified overlap between chunks
