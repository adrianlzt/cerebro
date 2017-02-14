
# Crear tabla
r.db('test').tableCreate('tv_shows')


# Insert
r.table('tv_shows').insert([{ name: 'Star Trek TNG', episodes: 178 },
                            { name: 'Battlestar Galactica', episodes: 75 }])


# Contar elementos
r.table('tv_shows').count()



# Query
r.table('tv_shows').filter(r.row('episodes').gt(100))

Devuelve:
{
"episodes": 178 ,
"id":  "806ea8de-c668-4147-917d-0893698ae963" ,
"name":  "Star Trek TNG"
}
