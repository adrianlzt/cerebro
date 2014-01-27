http://www.pymysql.org/
import pymysql
conn = pymysql.connect(host='127.0.0.1', port=3306, user='liberty' , passwd='liberty', db='liberty')
cur = conn.cursor()
cur.execute("SELECT * from prueba")
for r in cur.fetchall():
   print r
cur.close()
conn.close()
