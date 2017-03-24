https://github.com/torvalds/linux/blob/5924bbecd0267d87c24110cbe2041b5075173a25/Documentation/accounting/taskstats.txt

Implemetacion en python para obtener datos
https://github.com/facebook/gnlpy

git clone git@github.com:facebook/gnlpy.git
cd gnlpy
python setup.py install

sudo python taskstats_dump.py 28891

Con python3.6 no me funciona bien
Con python2.7 si funciona correctamente.
