http://events.linuxfoundation.org/sites/events/files/slides/guider_v2_OSS_LA_2017.pdf
https://github.com/iipeace/guider

A system-wide analyzer of performance

Herramienta en python para analizar linux >= 3.0

git clone https://github.com/iipeace/guider.git
cd guider
make
python guider.py

Me falla al instalar con pip.


# Thread profiler
guider record -s ./
guider ./guider.dat -o ./

# Function profiler
guider record -f -s ./ -e m
guider ./guider.dat -o ./ -l $(which addr2line) -r /

# Top like
guider top -a





guider ./guider.dat -o ./ -l $(which addr2line) -r /

# Errores
Probando el function profiler me dice que está corrupto el fichero grabado.
[Error] Fail to analyze because of corrupted data (over) at 481656

No me genera las imagens para el top profiler
