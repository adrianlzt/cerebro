https://python.langchain.com/en/latest/modules/indexes/document_loaders.html

Distintas funciones para poder cargar datos:
email, faceook chat, git, google drive, html, pdf, etc


Ejemplo, cargamos un pdf con
from langchain.document_loaders import PyPDFLoader
Y luego lo troceamos en chunks con
from langchain.text_splitter import TokenTextSplitter

Existen distintas opciones para cargar PDFs y distintas opciones para chunkear.
https://python.langchain.com/en/latest/modules/indexes/document_loaders/examples/pdf.html
https://python.langchain.com/en/latest/modules/indexes/text_splitters.html
