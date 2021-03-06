# https://docs.python.org/3/reference/datamodel.html
#
# python 2.x https://docs.python.org/release/2.2.3/whatsnew/sect-rellinks.html
# usar class XX(object)
# Si no heredamos object estamos usando las "old classes" de python2
#
# Licencia
#
# Copyright, etc
#

"""Resumen de que hace la clase

Descripc dión larga
"""

__author__ = 'adrianlzt'

import logging
import otro

logger = logging.getLogger(__name__)

class Model:
    """Descripcion corta."""

    var = 23
    # Variable de clase. Todas los objetos que instancien esta clase compartiran esa variable
    # Si usamos self. haremos que sea local a cada objeto (y deberá ir dentro de una funcion, generalmente __init__)

    def __init__(self, name):
        """Descripción corta.

        Descripcion larga

        :param name: descripcion del parametro
        :return: que se devuelve
        """

        self.name = name

    def save(self, force_update=False, force_insert=False):
        """Descripción corta.

        Descripcion larga

        :param
        :returns:
        """
  
        self.name = name

        if force_update and force_insert:
            raise ValueError("Cannot perform both operations")
        if force_update:
            #Update an existing record
            print "Updated an existing record"
        if force_insert:
            #Create a new record
            print "Created a new record"


Si el nombre de la clase tiene varias palabras usar CamelCase:
NombreConVariasPalabras

El fichero será lowercase con guiones:
nombre_con_varias_palabras.py


# Objeto de la clase model
c = Model('pepe')
c.save()

Cuando llamamos a cualquier función de una clase en realidad estamos haciendo:
c.save(c)
El 'self' siempre va a ser el primero parámetro de las funciones


# Herencia
Si no vamos a poner nada en el __init__ del child, no tenemos ni que declararlo.

class Empleado:
  def __init__(self, name):
    self.name = name

class Jefe(Empleado):
  def __init__(self, name):
    super().__init__(name)
    # Esta sintaxis es de py3, en py2 seria: super(Jefe, self).__init__(name)

    Algo típico sería:
    super().__init__(*args, **kwargs)


class ChildModel(Model):
  def save(self, *args, **kwargs):
    if self.name=='abcd':
      super(ChildModel, self).save(*args, **kwargs)
    else:
      return None



class Persona:
  nombre = None
  edad = None
  def getEdad(self):
      return self.edad

class Trabajador(Persona):
  empresa = None

t = Trabajador()
t.nombre = "pepe"
t.edad = 25
t.empresa = "guacon"
t.getEdad()


# Multiple herencia
class DerivedClassName(Base1, Base2, Base3):

https://stackoverflow.com/a/3277407/1407722
Si usamos super(), intentará primero ejecutar el __init__ de Base1, si no encuentra los atributos, usará Base2, etc



# Igualdad de objetos
__eq__(self, other)
debe devolver un Boolean significando que los objetos son, o no, iguales


# Iterador de nuestra clase
https://docs.python.org/3.6/tutorial/classes.html#iterators
def __iter__(self):
  pass
def __next__(self):
  pass



# Obtener funciones de una clase
import inspect
inspect.getmembers(Pepe, predicate=inspect.isfunction)


# Obtener funciones de un objeto
attr for attr in dir(pepe) if inspect.ismethod(getattr(pepe, attr))]
