https://github.com/shawn-sterling/graphios

A program to send nagios perf data to graphite (carbon)

# Install
pip intall graphios
Esto instala una versión antigua.

Mejor bajarse el git
Luego:
python setup.py bdist_rpm
rpm -pi dist/graphi...rpm

# Configuración
Se debería añadir estas variables para poner un prefio y postfijo de como se añadiran las métricas al formato de graphite:

/etc/graphios/graphios.cfg
Configurar el dir de spool, debug, sleep, automatic serv name, etc

Si usamos npcdmod, los ficheros que generan ya pueden ser consumidos por graphios, lo malo es que el formato de salida viene a fuego en npcdmod. Npcdmod tambien intenta ejecutar process_perfdata.pl por cada fichero encontrado.

Podemos usar el formato tradicional de icinga, definiendo nosotros el template de perfdata de icinga, donde lo va a escribir, y cada x segundos moviendo el fichero a un dir spool donde será consumido por graphios.


Big Warning
Graphios assumes your checks are using the same unit of measurement. Most plugins support this, some do not. check_icmp) always reports in ms for example.

## Influxdb
Tenemos que provisionar en el server un user, password y database.


# Internals
def process_log(file_name)

Lee un fichero y genera un diccionario con los valores que haya en el fichero.
Eg.: TIMET::1450895877       HOSTNAME::dsmctools_master-2    SERVICEDESC::memory
Lo convierte en un objecto tipo GraphiosMetric mediante la función get_mobj()

Finalmente obtenemos algo tipo:
processed_objects = [{"TIMET":1450895877, "HOSTNAME":"dsmctools_master-2", "SERVICEDESC":"memory"},...]



Luego ese objecto se envia con el metodo .send() de cada backend activado:
graphios_backends.py
