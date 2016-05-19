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


# Parametros
http://click.pocoo.org/6/api/#parameters

metavar="Nombre para la ayuda"

Se pueden pasar varias cadenas:
@click.option("-v","--verbose"...
    logger.critical("num verbose: %s", verbose)

## Types / tipos
http://click.pocoo.org/6/api/#types

Si como default ponemos un integer, el esperará que los paraḿetros pasados sean integers. Fallará en caso contrario.
Podemos forzar el tipo con type=xxx (str, int, float, etc)

### Choice
@click.option('--hash-type', type=click.Choice(['md5', 'sha1']))


## Options
@click.command()
@click.option('--string', default="pepe")
def cli(string):
    click.echo("Hola ", string)

## Callbacks
Si queremos realizar alguna tarea más compleja sobre un parámetro le podemos pasar una función de callback que podrá jugar con el contexto y el valor para retornar un valor distinto.
Por ejemplo, nos pasan un id o un nombre y nos encargamos de traducir eso para devolver siempre un id.

Si queremos recomponer el contexto en la función de callback haremos:
def _func_de_callback(c, param, value):
   ctx = c.ensure_object(Context)

### Boolean
@click.option('--verbose', is_flag=True)

verbose será True o False

## Argumentos
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

## Count
count=True nos devolverá un número de cuantas veces ha sido puesto ese parámetro.
Típico uso:
@click.option('-v','--verbose', count=True, help="Repetir para mas verbosidad")

## Multiple
@click.option('--message', '-m', multiple=True)
def commit(message):
    click.echo('\n'.join(message))

message será una tupla con los valores

# Command
@GRUPO.command()

O si no tenemos grupo
@click.command()

Por defecto el nombre será el de la función que decora.
Si queremos cambiar el nombre:
@click.command("nombre")



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

### sub-subcomandos
@click.group()
def main():
    pass

@main.group()
def org():
   pass

@org.command()
def show():
   print("Esto se llama como: programa org show")

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

