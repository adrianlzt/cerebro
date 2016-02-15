http://docs.python.org/2/library/stdtypes.html#file-objects

Leer sin meter los cambios de linea
with open('fichero', 'r') as fd:
    lines = [line.strip('\n') for line in fd.readlines()]

python2.7, 3.1:
with open("input", "r") as inp, open("output", "w") as out:
    out.write(inp.read())


Fichero existe:
import os
os.path.isfile("nombre")


Para lectura:
file = open("fichero")
file = open("fichero",'r')

Escritura:
file = open("fichero","w")

Append:
file = open("fichero","a")

try:
  file = open("/mnt/file","w")
except IOError as e:
  print "IO ERROR " + str(e.errno)


Otros parámetros:
'b' -> binario
'r+', 'w+' o 'a+' -> read+write simultaneo

Cerrar:
file.close()

Leer:
sietecaracteres = file.read(7)
  tras leer estos 7 caracteres el puntero estará listo para leer el octavo
todo = file.read()
linea = file.readline()
linea4carac = file.readline(4)
listadelineas = file.readlines()

Escribir:
file.write("cosas")
file.writelines(["una linea","otra linea"])
file.flush() #obligar a escribir al fichero

Escribir y leer:
file.write("pepe")
file.flush()
file.seek(0)
file.readlines()


## shutil ##
https://docs.python.org/2/library/shutil.html
Operaciones de alto nivel: copiar, mover, borrar

## os ##
Mirar os.md para mas operaciones

## Touch ## 
open('/tmp/pruebaaaa', 'a').close()

# Acceder a un fichero que esta en el mismo path que el binario
http://stackoverflow.com/questions/4060221/how-to-reliably-open-a-file-in-the-same-directory-as-a-python-script
__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

f = open(os.path.join(__location__, 'bundled-resource.jpg'))
