http://docs.mongodb.org/manual/reference/sql-comparison/

SELECT DISTINCT('cosa') FROM tabla -> db.tabla.distinct('cosa')


SELECT * FROM users WHERE user_id like "%bc%"  -> db.users.find( { user_id: /bc/ } )
