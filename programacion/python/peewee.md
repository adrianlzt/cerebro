https://pypi.python.org/pypi/peewee

Mapeo objeto-relacional.

Creamos objetos en python que se mapean en una bbdd sql, como se hace en el "model" de django.

Ejemplo:

class Tweet(BaseModel):
    user = ForeignKeyField(User, related_name='tweets')
    message = TextField()
    created_date = DateTimeField(default=datetime.datetime.now)
    is_published = BooleanField(default=True)
