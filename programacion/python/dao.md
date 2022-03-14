# DAO ejemplo para postgresql
https://github.com/brunofarina/Simple-DAO-Postgres-Example/blob/master/userDAO.py


# psycopg2
USAR LA v3: https://www.psycopg.org/psycopg3/docs/
https://www.psycopg.org/docs/
pip install psycopg2
pip install psycopg2-binary

CUIDADO! parec que cuando iniciamos la conex arranca una tx y no la cierra hasta que cerramos la conex.
Hacer siempre commit en la propia query:
curprod.execute("select * from history limit 1; commit;")

En la propia doc hacen referencia al problema este:
https://www.psycopg.org/docs/usage.html#transactions-control (en el Warning).

Podemos usar también autocommit.
NOTA!
Usar conn.autocommit = True


¿Por qué está por defecto a off?
https://stackoverflow.com/questions/22019154/rationale-for-db-api-2-0-auto-commit-off-by-default


import psycopg2
conn = psycopg2.connect("dbname='template1' user='dbuser' host='localhost' password='dbpass'")  # Puede generar excepcion
conn.autocommit = True
cur = conn.cursor()
cur.execute("SELECT 1")
cur.fetchall()

Solo un resultado
curs.execute(sql)
template = curs.fetchone()  # Formato ('primera col', 'segunda')


cur.execute("INSERT INTO test (num, data) VALUES (%s, %s)",(100, "abc'def"))
conn.commit()
  despues de insert/update hacer commit para que se registre el cambio

cur.close()
conn.close()

Gestionar cerrado de conex y/o cursor:
DSN = "DSN = "host=localhost user=postgres password=zabbix dbname=zabbix"
SQL = "select 1"
with psycopg2.connect(DSN) as conn:
    with conn.cursor() as curs:
        curs.execute(SQL)


Se puede iterar directamente sobre un cursor tras un .execute()

for i in cur:
  print(i)


http://initd.org/psycopg/docs/usage.html#with-statement
Podemos usar "with" con la "conn" y los "cur".
"conn" no terminará tras el with




# py-postgresql
http://pythonhosted.org/py-postgresql/
pip install py-postgresql

db = postgresql.open('pq://adrian@localhost/adrian')
db.execute("create database...")
x = db.prepare("select * from crags;")
m =x.declare()
m.read()
[(1, 'Vellon', '0101000020E6100000E48233F8FB7D52C0D82C978DCE634440')]


