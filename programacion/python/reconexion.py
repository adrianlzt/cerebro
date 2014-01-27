import bitcoinrpc
import time

def main():
	global conn
	conn = bitcoinrpc.connect_to_remote('','L9XCUdJf1i','127.0.0.1',18332)

	print "Iniciando bucle"
	var = reconectar()
	print "Fuera del bucle, reconectado", var
	print str(conn.getblockcount())

def reconectar():
	wait = 2
	while 1:
		try:
			print "intento conectar"
			return conn.getinfo()
			print "Reconectado!"
			return
		except Exception,e:
			print "sin conexion. a dormir", wait
			time.sleep(wait)
			wait = wait*2
			continue

if __name__ == '__main__':
	main()
