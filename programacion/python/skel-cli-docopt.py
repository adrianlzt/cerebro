#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""docopt-cli.py

Client script using docopt library.

Usage:
  docopt-cli.py [options] <command> [<args>...]

Commands:
  uppercase                convertir string a mayusculas
  lowercase                convertir string a minusculas
  hex                      convertir string a hexadecimal

General options:
  -h --help                 show help message and exit
  -V --version              show version and exit
  -v --verbose              print status messages
  -d --debug                print debug messages

See docopt-cli.py <command> --help for more information on a specific command.
"""

import sys
try:
    from docopt import docopt, DocoptExit, DocoptLanguageError
except ImportError:
    print "docopt module has to be installed"
    sys.exit(1)

import logging

FORMAT = "[%(levelname)s %(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
logging.basicConfig(level=logging.ERROR, format=FORMAT)
logger = logging.getLogger(__name__)


__version__ = '0.1'
RETURN_CODE_ERROR = 1


################################################################################
class Client(object):
    """
    A client which executes some docopt.
    """

    def __init__(self):
        pass

    ############################################################################
    def uppercase(self, args):
        """
Convierte la cadena en mayusculas

Usage:
  docopt-cli.py uppercase <cadena> [--capital]

Options:
  -c, --capital             Saca también la palabra con las primeras letras en mayuscula
        """
        print("La cadena en mayusculas: %s" % args['<cadena>'].upper())

        if args['--capital']:
            print("La cadena con la primera capital: %s" % args['<cadena>'].title())

        logger.info("cadena original: %s", args['<cadena>'])
        logger.debug("argumentos:\n%s", args)

    ############################################################################
    def lowercase(self, args):
        """
Convierte la cadena a minusculas

Usage:
  docopt-cli.py lowercase <cadena>
        """
        print("La cadena en minusculas: %s" % args['<cadena>'].lower())
        logger.info("cadena original: %s", args['<cadena>'])
        logger.debug("argumentos:\n%s", args)

    ############################################################################
    #
    def hex(self, args):
        """
Convierte las letras a hexadecimal

Usage:
  docopt-cli.py hex [--prefix=<prefix>] [--args | --cmd]
  docopt-cli.py hex [--double | --no_new_line] <cadena>

Options:
  --double                 Double lines
  --no_new_line            Don't print new lines
  --prefix=<prefix>        Poner un prefix al output
  --args                   Print args
  --cmd                    Print cmd
        """
        logger.debug("argumentos:\n%s", args)

        if args['<cadena>']:
            for x in list(args['<cadena>']):
                if args['--double']:
                    print("Caracter: %s\n\n" % hex(ord(x)))
                elif args['--no_new_line']:
                    print("%s" % hex(ord(x))),
                else:
                    print("Caracter: %s" % hex(ord(x)))
        else:
            if args['--args']:
                print("%s%s" % (args['--prefix'],args))
            elif args['--cmd']:
                print("%s%s" % (args['--prefix'],sys.argv[0]))
            else:
                print("%s vacio" % args['--prefix'])

    

################################################################################
#
def _execute_cmd(method, args):
    """
    Execute command
    """
    method(args)


def main():
    """
    Create a client, parse the arguments received on the command line and call
    the appropriate method.
    """
    try:
        args = docopt(__doc__, version=__version__, options_first=True)
    except DocoptExit as e:
        sys.stderr.write("ERROR: invalid parameters\n\n%s" % e.message)
        sys.exit(RETURN_CODE_ERROR)


    # set logging
    if args['--verbose']:
        logger.setLevel(logging.INFO)
    if args['--debug']:
        logger.setLevel(logging.DEBUG)

    cli = Client()

    cmd = args['<command>']

    # test if method exists
    if hasattr(cli, cmd):
        method = getattr(cli, cmd)
    else:
        sys.stderr.write("This command '%s' doesn't exist, try:\n%s --help" % (cmd, sys.argv[0]))
        sys.exit(RETURN_CODE_ERROR)

    # re-parse docopt with the relevant docstring from name of cmd
    docstring = method.__doc__.strip()
    if 'Usage:' in docstring:
        try:
            args.update(docopt(docstring, argv=sys.argv[sys.argv.index(cmd):]))
        except DocoptLanguageError as e:
            sys.stderr.write("ERROR: %s\n\n\n%s: %s\n" % (e.message, cmd, docstring))
            sys.exit(RETURN_CODE_ERROR)

    # execute the command
    _execute_cmd(method, args)

if __name__ == '__main__':
    main()
    sys.exit(0)
