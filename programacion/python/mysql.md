http://www.pymysql.org/
import pymysql
conn = pymysql.connect(host='127.0.0.1', port=3306, user='liberty' , passwd='liberty', db='liberty')
cur = conn.cursor()
cur.execute("SELECT * from prueba")
for r in cur.fetchall():
   print r
cur.close()
conn.close()



http://mysql-python.sourceforge.net/MySQLdb.html#mysqldb
import MySQLdb
db=MySQLdb.connect(passwd="moonpie",db="thangs")
c=db.cursor()
max_price=5
c.execute("""SELECT spam, eggs, sausage FROM breakfast WHERE price < %s""", (max_price,))
c.fetchone()

Resultado:
(3L, 2L, 0L)

