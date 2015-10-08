IMPORTANTE! debe llevar un cambio de linea al final

echo "categoria.nombre valor horaUTC" > /dev/tcp/127.0.0.1/2003
echo "adri.test 7 $(date +%s)" > /dev/tcp/127.0.0.1/2003

He visto que con una instancia docker tengo que mandar un control+c porque el nc no cierra.

Pueden ponerse subcategorias: categoria.subcategoria1.subcategoria2.nombre


# Python
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('127.0.0.1',2003))
res = s.send("python.test2 23 1443865042\n")
s.close()

