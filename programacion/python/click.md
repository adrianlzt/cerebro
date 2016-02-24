http://click.pocoo.org/

Click is a Python package for creating beautiful command line interfaces in a composable way with as little code as necessary. It’s the “Command Line Interface Creation Kit”. It’s highly configurable but comes with sensible defaults out of the box.


pip install click



# Basico
import click

@click.command()
def funcion():
    print("Hola")

if __name__ == "__main__":
    funcion()

El decorador nos dara un usage y la llamada a --help

En vez de usar el truco de __main__ podemos hacer un package con un setup.py


# Opciones / Parametros
@click.command()
@click.option('--string', default="pepe")
def cli(string):
    click.echo("Hola ", string)

Si como default ponemos un integer, el esperará que los paraḿetros pasados sean integers. Fallará en caso contrario.
Podemos forzar el tipo con type=xxx (str, int, float, etc)

## Boolean
@click.option('--verbose', is_flag=True)

verbose será True o False


# Argumentos
Al contrario que los "options", estos no comienzan con "--"
Los usaremos para pasar por ejemplo ficheros

Valor por defecto:
default="pepe.txt"

Para hacerlos no obligatorios:
required=False

## Files
@click.argument('out', type=click.File('w'))
out será un file decriptor donde podremos escribir
En caso de un fichero tambien podremos pasar un "-" para coger salida/entrada estandar

## File path
click.Path()

# Echo
Mejor usar click.echo() que maneja correctamente los strings, unicode, etc

Tambien se puede pasar el kwargs file=fd para escribir sobre un fichero.

# Usage
@click.command()
@click.option('--string', default="pepe",
        help="Debe ser pepe")
def cli(string):
    """Script que te dice hola"""
    click.echo("Hola! %s" % string)


## Subcomandos

@click.group()
def principal():
    pass

@principal.command()
def sub1_principal():
    pass

@principal.command()
def sub2_principal():
    pass

sub1_principal y sub2_principal serán subcomandos del método principal()

principal() se ejecutará siempre que se ejecute uno de los subcomandos.
Este será donde definamos parámetros generales (verbose, debug, etc)

### Pasar información entre el programa principal y subcomandos

class Config(object):

    def __init__(self):
        pass

pass_config = click.make_pass_decorator(Config, ensure=True)

@click.group()
@click.option('--verbose', help="Debe ser pepe", is_flag=True)
@pass_config
def cli(config, verbose):
     config.verbose = verbose

@pass_config
def say(config):
    """Script que te dice hola"""
    if config.verbose:
        click.echo("verbose")

