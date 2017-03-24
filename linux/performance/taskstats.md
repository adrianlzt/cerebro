https://github.com/torvalds/linux/blob/5924bbecd0267d87c24110cbe2041b5075173a25/Documentation/accounting/taskstats.txt

Ejemplo en c:
https://raw.githubusercontent.com/torvalds/linux/5924bbecd0267d87c24110cbe2041b5075173a25/Documentation/accounting/getdelays.c
gcc -I/usr/src/linux/include getdelays.c -o getdelays

Implemetacion en python para obtener datos
https://github.com/facebook/gnlpy

git clone git@github.com:facebook/gnlpy.git
cd gnlpy
python setup.py install

sudo python taskstats_dump.py 28891

Con python3.6 no me funciona bien
Con python2.7 si funciona correctamente.



Atop tambien usa esta forma de conexión con el kernel:
netlink.c:netlink_open(void)

Escucha en todos los procesadores
