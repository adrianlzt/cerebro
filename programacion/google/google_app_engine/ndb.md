https://cloud.google.com/appengine/docs/python/datastore/modelclass
https://cloud.google.com/appengine/docs/python/ndb/#storing
https://cloud.google.com/appengine/docs/python/ndb/admin



Tipos de datos:
https://cloud.google.com/appengine/docs/python/datastore/typesandpropertyclasses
ndb.IntegerProperty(default=0)
ndb.FloatProperty(required=True)
ndb.StringProperty()
ndb.TextProperty()
ndb.LinkProperty() -> no fona, usar StringProperty

DateTimeProperty guarda dia y hora
actualizacion = ndb.DateProperty(auto_now=True) # se actualiza con dia y hora cada vez que lo actualizamos
auto_now_add=True, se guarda la fecha de creacion
...

Para python:
https://cloud.google.com/appengine/docs/python/ndb/properties#types


En el entorno de desarrollo podemos ver lo que hemos creado:
http://localhost:8000/datastore


# Ejemplo
from google.appengine.ext import ndb

class Casa(ndb.Model):
    titulo = ndb.StringProperty()
    precio = ndb.FloatProperty()
    terraza = ndb.BooleanProperty()
    features = ndb.StringProperty()

    @classmethod
    def get_all(cls):
        return cls.query().fetch()


# Escribir
casa1 = Casa(titulo='casita , precio=564.3)
casa1.put()
casa2 = Casa(titulo='barajas cento', precio=924.3, terraza=True, features="un texto mas largo con cosas que tiene la casa")
casa2.put()

Podemos forzar el id:
casa3 = Casa(id=1, titulo='casita , precio=564.3)
casa3.put()
Si vuelvo a guardar una casa con id=1 sobreescribira a esta.



# Query/Leer
casas = Casa.get_all()
for casa in casas:
    print(casa.titulo)

Obtener por id:
c = Casa.get_by_id(id)

Obtener el id de un elemento:
c.key.id()


## Date
import datetime
now =  datetime.datetime.now()
date = now - datetime.timedelta(minutes=20)
casas = Casa.query(Casa.actualizacion > date).fetch()
  # casas sera un array con todos los elementos
  # Si solo queremos el primero: .fetch(1)
  # Si no ponemos el .fetch() tendremos un objeto tipo Query()


## And
casas = Casa.query(ndb.AND(Casa.actualizacion > date),(Casa.archivar == False)).fetch()



# Borrar
c.key.delete()


# GeoPtProperty

Definicion:
punto = ndb.GeoPtProperty()

Crear el punto:
from google.appengine.ext import ndb
p = ndb.GeoPt(51.123, -0.123)
