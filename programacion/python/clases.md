#
# Licencia
#
# Copyright, etc
#

"""Resumen de que hace la clase

Descripción larga
"""

__author__ = 'adrianlzt'

import logging
import otro

logger = logging.getLogger(__name__)

class Model(object):
    """Descripcion corta."""

    var = 23
    # Variable de clase. Todas los objetos que instancien esta clase compartiran esa variable
    # Si usamos self. haremos que sea local a cada objeto (y deberá ir dentro de una funcion, generalmente __init__)

    def __init__(self, name):
        """Descripción corta.
  
        Descripcion larga
  
        :param
        :returns:
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
class ChildModel(Model):
  def save(self, *args, **kwargs):
    if self.name=='abcd':
      super(ChildModel, self).save(*args, **kwargs)
    else:
      return None
