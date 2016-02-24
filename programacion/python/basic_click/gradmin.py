#!/usr/bin/env python

import sys
try:
    import click
except ImportError:
    print("click module has to be installed")
    sys.exit(1)

import logging

FORMAT = "[%(levelname)s %(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
logging.basicConfig(level=logging.ERROR, format=FORMAT)
logger = logging.getLogger(__name__)

class Context(object):
    """Objecto para pasar informacion a los subcomandos"""
    def __init__(self):
        pass

pass_context = click.make_pass_decorator(Context, ensure=True)

@click.group()
@click.option('--verbose', is_flag=True)
@click.option('--debug', is_flag=True)
@click.option('--user', type=str, required=True)
@pass_context
def main(context, verbose, debug, user):
    # set logging
    if verbose:
        logger.setLevel(logging.INFO)
    if debug:
        logger.setLevel(logging.DEBUG)

    # pasamos informacion
    context.user = user

@main.command()
@click.option('--repeat', default=3,
        help="Cuantas veces se repite")
@pass_context
def say(context, repeat):
    """Script que te dice hola"""

    logger.debug("Mensaje nivel debug")
    logger.info("Mensaje nivel info")
    logger.critical("Mensaje nivel critical")
    for i in range(repeat):
        click.echo("Hola! %s " % context.user)


# Parte necesaria si no es un package de python
# Si es un package tambien podremos quitar en shebang
if __name__ == '__main__':
    main()
    sys.exit(0)

