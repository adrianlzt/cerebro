https://python.langchain.com/en/latest/modules/chains/examples/sqlite.html?highlight=SQLDatabaseChain

from langchain import OpenAI, SQLDatabase, SQLDatabaseChain
db = SQLDatabase.from_uri(f"sqlite:////var/tmp/tmp.o3psrgjam0/Chinook_Sqlite.sqlite")
llm = OpenAI(temperature=0)
db_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)
db_chain.run("How many employees are there?")

Al ejecutar esa cadena lo que se hace es mandar un prompt (https://github.com/hwchase17/langchain/blob/master/langchain/chains/sql_database/prompt.py) al llm pidiéndole que genere una query SQL.
Se le pasa como información el schema de todas las tablas y un "select * from TABLA" de cada una, para que tenga una idea de los datos que hay.


Genera la query
SELECT COUNT(*) FROM Employee;

Luego se ejecuta esa query contra la db usando sqlalchemy y se completa la última parte del prompt:
"""
...
Question: How many employees are there?
SQLQuery: SELECT COUNT(*) FROM Employee;
SQLResult: [(8,)]
Answer:
"""

Se vuelve a enviar ese prompt al LLM para que nos de la respuesta.
