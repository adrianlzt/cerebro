>>> type([1,2])
<type 'list'>

atributos, metodos, etc de una variable:
dir(nombre)


>>> isinstance([1,2],list)
True




class Config(object):

    def __init__(self):
        self.dict = {"clave": "valor"}

    def __getattribute__(self, name):
        """para usar como objecto.nombre
        Se llama antes que incluso a los propios parametros de la clase
        Intentar evitar su uso
        """
        return self.dict[name]

    def __getattr__(self, name):
        """para usar como objecto.nombre"""
        return self.dict[name]

    def __getitem__(self, name):
        """para usar como objecto['nombre']"""
        return self.dict[name]

    def __str__(self):
        return "hola"

    def funcion(self):
        return "blabla"

config = Config()
print config.clave
  # "valor"
print config
  # "hola"
  

var = "funcion"
getattr(config,var)
equivalente a
config.funcion
