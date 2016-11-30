https://docs.python.org/2/library/configparser.html


prueba.cfg:
[agent]
hola=123

Tambien vale:
hola: 123


prueba.py
import ConfigParser
#import configparse #en python3
config = ConfigParser.RawConfigParser()
config.read("prueba.cfg")
config.get('agent','hola')

get()
getint()
getfloat()
getboolean()


if config.has_option('agent','PERIOD'):
    self.period = config.getfloat('agent','PERIOD')
else:
    self.period = 10



Es obligatorio que el fichero tenga secciones ([cosa])


# Fichero sin secciones
http://stackoverflow.com/questions/2885190/using-pythons-configparser-to-read-a-file-without-section-name

from io import StringIO
from ConfigParser import ConfigParser
try:
    # Open the config file and prepare a pseudo section to make it parsable with ConfigParser
    f = open(path, "r")
    pseudo_config = StringIO(u'[seccion]\n' + f.read())
    parser = ConfigParser()
    config = dict()
    for param_key in ('url', 'username', 'password', 'timeout'):
       try:
           config[param_key] = parser.get('seccion', param_key)
       except NoOptionError:
           print 'Configuration parameter \"' + param_key + '\" is required'
           raise
except IOError:
    print 'Error reading file \"' + path + '\"'
    raise
parser.readfp(pseudo_config)


Python3:
from configparser import ConfigParser
from itertools import chain

parser = ConfigParser()
with open("foo.conf") as lines:
    lines = chain(("[top]",), lines)  # This line does the trick.
    parser.read_file(lines)


# Convertir a diccionario un fichero:
for section in config.sections:
    my_dict[section] = dict(config.items(section))

