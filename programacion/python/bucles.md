while str == 'abc':
	cmd = raw_input('Introduzca comando: ')

	# No existen los switch-case, así que se haría de esta manera
	if cmd == 'a':
		print "hola"
		break # Sale del bucle
	elif cmd == 'b':
		print "adios" + str(n)
	else:
		sys.exit() #previo import sys

lista=['asda','2342','bbbb',11]
for l in lista:
	print l

for num in range(0,10):
  if num == 5:
    continue # pasa al siguiente loop
	print "numero: %d" % (num)


# Bucle infinito
while True:
    time.sleep(1)
