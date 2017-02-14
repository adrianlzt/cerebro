Una vez cargado el programa, conectaremos con picocom y reiniciaremos el nodemcu enviando un Control+d (o botón de reset si no hace caso)
Veremos las trazas cuando rearranque.


Si se queda tonto, entramos con el picocom y:
import os
os.remove("main.py")
