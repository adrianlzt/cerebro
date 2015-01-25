http://pydhcplib.tuxfamily.org/pmwiki/

mkvirtualenv dhcp
cd /tmp
wget http://pydhcplib.tuxfamily.org/download/pydhcplib-0.6.2.tar.gz
tar zxvf pydhcplib-0.6.2.tar.gz
cd pydhcplib-0.6.2
Modificar setup.py para que use python2.7
./setup.py build
./setup.py install


Ejemplo de construir un paquete:
examples/gen_packet_example.py

Ejemplo cliente:
examples/client_example.py

Para ejecutarlo quitar el shebang (la primera linea donde llama a python) para usar el virtual env.
Llamar con sudo. Como sudo nos quita el ENV hace falta llamar al python directamente:
sudo /home/adrian/.virtualenvs/dhcp/bin/python client_example.py
