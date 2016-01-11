https://docs.djangoproject.com/en/1.8/topics/db/models/

Referencia:
https://docs.djangoproject.com/en/1.8/ref/models/fields/

# Ejemplo

from django.db import models

class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class Book(models.Model):
    title = models.CharField(max_length=30)
    author = models.ForeignKey(Person)


# Uso
Crear una instancia de un modelo:
Person.objects.create(first_name=‘John’, last_name=‘Smith’)

Obtener una instancia:
person = Person.objects.get(first_name=‘John’, last_name=‘Smith’)

Obtener varias instancias
people = Person.objects.filter(first_name=‘John’)

Borrar las instancias
people.delete()

# sincronizar la bbdd tras un cambio en un modelo
manage.py migrate
