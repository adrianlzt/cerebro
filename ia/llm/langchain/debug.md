https://python.langchain.com/docs/guides/debugging


OBSOLETO:

Si queremos debugear todo lo que hace LangChain tendremos que arrancar su server web:
langchain-server

Levantará una app web en http://localhost:4173/

Luego tendremos que configurar esta venv para que nuestro programa python envíe las trazas:
export LANGCHAIN_HANDLER=langchain
