varglobal = 'cosa'

def nombreFunc(param1,numero):
	print "saco el numero", numero

if a != 3:
	ablab

Bucles:
while str == 'abc':
	cmd = raw_input('Introduzca comando: ')

	# No existen los switch-case, así que se haría de esta manera
	if cmd == 'a':
		print "hola"
		break
	elif cmd == 'b':
		print "adios" + str(n)
	else:
		sys.exit() #previo import sys

lista=['asda','2342','bbbb',11]
for l in lista:
	print l

for num in range(0,10):
	print "numero: %d" % (num)



try:
	cosas chungas
except Exception,e
	print "Excepcion: " + str(e)



If
http://www.mclibre.org/consultar/python/lecciones/python_if_else.html
edad = int(input("¿Cuántos años tiene? "))
if (edad >= 18 and edad < 24) or (edad > 50):
    print("Es usted mayor de edad")


Tipos de datos:
http://docs.python.org/2/library/datatypes.html

Dict:
b = {'one': 1, 'two': 2, 'three': 3}
b.get('one')
b['one']

'one' in b #Devuelve true si 'one' es key del diccionario


Listas: http://docs.python.org/2/tutorial/datastructures.html
http://effbot.org/zone/python-list.htm
lista.pop #Saca 11 y lo elimina de la lista
lista.pop(0) #Saca 'asda' y lo elimina de la lista
len(lista) #Longitud de la lista
list.index(elemento) #Nos dice la posicion de un elemento, y nos vale para saber si lo contiene
lista[1] #Obtener el elemento que esta en esa posición de la lista


Obtener info de una variable:
type(var) //de que tipo es
dir(var) //clases que tiene
var.__dict__  //valores almacenados
repr(var)


Return varios valores:
def cosa():
	a=1
	b=2
	return a, b
var1, var2 = cosa()


Generar lista: emails = [u.email for u in mailUsers]

Crear una ristra de nombre unidos por comas:
msg['To'] = ",".join(emails)
