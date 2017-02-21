http://www.snarky.ca/how-the-heck-does-async-await-work-in-python-3-5
Creo que tengo mezclado los generadores con la corutinas

Ejemplo de uso creando una función "range" custom:

def eager_range(up_to):
    """Create a list of integers, from 0 to up_to, exclusive."""
    sequence = []
    index = 0
    while index < up_to:
        sequence.append(index)
        index += 1
    return sequence


def lazy_range(up_to):
    """Generator to return the sequence of integers from 0 to up_to, exclusive."""
    index = 0
    while index < up_to:
        yield index
        index += 1

La segunda forma es usando generadores.
La gran ganancia es que de esta forma solo tenemos que tener en memoria un número.
De la otra manera tendríamos que almacenar en memoria toda la lista de números (y podría ser un problema si fuese muy grande)


También existe send() para los generator, para poder enviar un valor a un generador pausado.
Con esto tenemos una especie de coroutina



yield from
Para pasar generadores hacia arriba y hacia abajo.
def lazy_range(up_to):
    """Generator to return the sequence of integers from 0 to up_to, exclusive."""
    index = 0
    def gratuitous_refactor():
        while index < up_to:
            yield index
            index += 1
    yield from gratuitous_refactor()




Ejemplo facil de un generador
def multiple(cadena):
    split = cadena.split(".")

    if len(split) == 2:
        yield cadena
    else:
        for i in split:
            yield i+"."

cadena = "mi.texto.con.cosas"
for x in multiple(cadena):
    print(x)

Si "cadena" tiene solo un punto, nos devuelve la cadena tal cual.
Si tienes más de un punto, nos devuelve la cadena troceada: "mi.", "texto.", etc
