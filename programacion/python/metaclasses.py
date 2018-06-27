# Interceptar la creación de la clase
#
# Ejemplo de como usar una metaclase para chequear que las herencias
# de la clase "Base" tienen un método "bar".
# Estamos forzando a que el código usuario se implemente de una manera.
# Este chequeo se realizará nada más arrancar, por lo que evitaremos que falle en runtime.
# La idea es evitar que esto pueda ejecutarse sin problemas y solo falle cuando el codigo vaya
# a ejecutar foo()
class BaseMeta(type):
    def __new__(cls, name, bases, body):
        if not "bar" in body:
            raise TypeError("missing bar in user code")
        return super().new(cls, name, bases, body)

class Base(metaclass=BaseMeta):
    def foo(self):
        return self.bar()



# Python 3.6
# Nueva forma de implementar un hook ante la creacion de subclases
# Puede que la sintaxis no sea la correcta
class Base(metaclass=BaseMeta):
    def foo(self):
        return self.bar()

    def __init_subclass(__self, *a, **kw):
        # Aqui meteríamos las comprobaciones de la nueva subclase que se está creando
        return super().__init_subclass__(*a, **kw)
