Ejemplo básico de como se trabaja con ficheros y el import:

main.py
from fichero1 import Pantalla
if __name__ == '__main__':
    print Pantalla().imprimite()


fichero1.py:
class Pantalla():
    def imprimite(self):
        return "imprimo por pantalla"




$ python main.py
imprimo por pantalla
