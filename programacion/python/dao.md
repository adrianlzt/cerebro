# DAO ejemplo para postgresql
https://github.com/brunofarina/Simple-DAO-Postgres-Example/blob/master/userDAO.py


# psycopg2
https://www.psycopg.org/docs/
pip install psycopg2
pip install psycopg2-binary

import psycopg2
conn = psycopg2.connect("dbname='template1' user='dbuser' host='localhost' password='dbpass'")  # Puede generar excepcion
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


