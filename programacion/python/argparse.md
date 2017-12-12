https://docs.python.org/2.7/library/argparse.html

mejora sobre optparse
A partir de python2.7

mirar docopt.md

mirar argh.md
Parece complicado

argparse nos autogenera los usage, pone valores por defecto, limita que valores podemos meter, etc.

import argparse

# Parse arguments, just config file
parser = argparse.ArgumentParser(prog="cyclops", description='Monitoring as a service')
parser.add_argument("-c", "--config", action="store", dest="input_config_file",
                            help="Path to the cyclops configuration file.", default=None)
# Positional argument                            
parser.add_argument("cuenta", metavar="cuenta", help="Mostrar únicamente esta cuenta") # Esto genera algo tipo: prg [-c] cuenta
args = parser.parse_args()

if args.input_config_file:
    config_file = args.input_config_file
else:
    config_file = "/etc/cyclops_agent.conf"



import argparse
parser = argparse.ArgumentParser()
parser.add_argument("-c", "--config", dest="input_config_file", help="Path to the cyclops configuration file.", default="/etc/cyclops_agent.conf")
parser.add_argument("-u", "--user", dest="user", help="Introduce user name.", default=None, required=True, choices=['maria', 'pepe'])


Parsear numeros (type=[float,int]):
  parser.add_argument('--timeout-cinder', '-C', help='Number of seconds to wait for volume creation before timeout',
      dest=OpenstackConstants.KEY_TIMEOUT_CINDER, action='store',required=False, default=OpenstackConstants.DEFAULT_TIMEOUT_CINDER,type=int)

Tambien se pueden pasar ficheros:
parser.add_argument("-c", "--cert", type=args.FileType('r'), dest="cert", help="Server cert to check")
contenido_fichero = args.cert.read()
for line in args.cert.readlines(): ...

Repetir varias veces un parametro (list, array):
parser.add_argument('-i','--input',action='append')
 asi podemos poner: -i 1 -i 2

parser.add_argument('-i','--input',action='append',nargs=2)
 esto hace que podamos poner: -i uno dos
 nargs='+' nos permite poner todos los que queramos (1 o más)
 narngs='?' ningún parámetro o uno
 nargs='*' cero o más paramétros

parser.add_argument("cuenta", metavar="cuenta", nargs='+')
  genera algo tipo programa.py cuenta [cuenta...]



p.add_argument("-G", "--no_graph", action="store_const", dest="graph", help="Not show graphic", default=True, const=False)
  Si ponemos '-G', la variable "graph" se pone a False, si no, True.


Si queremos que la ayuda muestre los valores por defecto:
http://stackoverflow.com/questions/12151306/argparse-way-to-include-default-values-in-help
parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)

Tambien tenemos disponible la variable "defaults". Ejemplo con python3:
help='One or more RegEx that match the names of the container(s) to check. If omitted all containers are checked. (default: %(default)s)')


# Subcomandos
https://docs.python.org/3/library/argparse.html#argparse.ArgumentParser.add_subparsers
Mirar parser_subcommands.py

Si cuando llamamos a add_subparsers pasamos metavar="action", será por que pasaremos funciones a los argumentos y estas serán llamadas automaticamente (ejemplo de encima).
Si ponemos "dest='cmd'", el tipo de subcommand se almacenará en esa variable.

Si queremos que el subparser sea obligatorio definirlo:
subparsers = p.add_subparsers(title='subcommands', dest='action')
subparsers.required = True


# Grupos excluyentes
http://stackoverflow.com/questions/11154946/argparse-require-either-of-two-arguments

Solo puede ponerse una de las dos opciones

group = parser.add_mutually_exclusive_group(required=True)
group.add_argument('--foo',action=.....)
group.add_argument('--bar',action=.....)
args = parser.parse_args()


# Incluyentes
http://stackoverflow.com/questions/19414060/argparse-required-argument-y-if-x-is-present

No hay una opción para esto, pero lo podemos implementar fácilmente:

if args.prox and args.lport is None and args.rport is None:
    parser.error("--prox requires --lport and --rport.")

Cuidado porque si usamos grupos tal vez args.prox no exista. Mejor usar algo tipo:
if hasattr(args, "cuenta_destino") and args.cuenta_destino and args.titular_destino is None:
En este caso el segundo args.xx si lo usamos porque existirá siempre que exista "cuenta_destino"



# Validar datos
https://docs.python.org/2.7/library/argparse.html#type

def perfect_square(string):
    value = int(string)
    sqrt = math.sqrt(value)
    if sqrt != int(sqrt):
        msg = "%r is not a perfect square" % string
        raise argparse.ArgumentTypeError(msg)
    return value

parser.add_argument('foo', type=perfect_square)



# Debug
import argparse
parser=argparse.ArgumentParser()
parser.add_argument("-i", "--input")
args = parser.parse_args(["-i","coso"])
args.input
