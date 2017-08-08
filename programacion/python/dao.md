# DAO ejemplo para postgresql
https://github.com/brunofarina/Simple-DAO-Postgres-Example/blob/master/userDAO.py


http://pythonhosted.org/py-postgresql/
pip install py-postgresql

db = postgresql.open('pq://adrian@localhost/adrian')
db.execute("create database...")
x = db.prepare("select * from crags;")
m =x.declare()
m.read()
[(1, 'Vellon', '0101000020E6100000E48233F8FB7D52C0D82C978DCE634440')]


