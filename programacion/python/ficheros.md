http://docs.python.org/2/library/stdtypes.html#file-objects

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
'+' -> read+write simultaneo
'w+r' -> escritura y lectura (puede no existir)
'r+w' -> tiene que existir

Cerrar:
file.close()

Leer:
sietecaracteres = file.read(7)
todo = file.read()
linea = file.readline()
linea4carac = file.readline(4)
listadelineas = file.readlines()

Escribir:
file.write("cosas")
file.writelines(["una linea","otra linea"])
file.flush() #obligar a escribir al fichero

