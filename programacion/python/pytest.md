http://pytest.org/latest/
Simple powerful testing with Python

Guía de como usarlos:
https://github.com/pluralsight/intro-to-pytest/blob/master/tutorials/01_basic_test.md

Hay muchos plugins para distintas librerías.


Un test se considera válido si:
 - todas las assert son True
 - o no hay ningún assert
 - no hay excepciónes no manejadas

Los ficheros de test deberán terminar en `_test.py`

Cada test individual será una función que comience por `test_`

"conftest.py" es un fichero especial que se buscará en el path actual y en los paths padres.
En él podemos, entre otras cosas, definir fixtures globales.



ejemplo_basico.py
def test_example():
    assert DATA_SET_A == DATA_SET_B

Lo ejecutamos con:
pytest ejemplo_basico.py

Subiendo nivel de debug, verbose (mostrar test a test) y seleccionando con una regexp (-k) que ejecutar:
pytest --log-level=DEBUG --log-cli-level=DEBUG -v -k test_worker_host_not_found_in_inventory

Si ponemos -s veremos los print que hayamos puesto.


# assert
Hace mucha magía por debajo para comparar los distintos tipos de datos que puede haber.
Nos da el detalle de que falla
-v para ver el detalle
-vv toda la info disponible


# comparación similar
En unittest es assertAlmostEqual
assert 0.1 + 0.2 == pytest.approx(0.3)


# excepciones
Capturar una excepción.
Ejemplo, el test OK es que salte una excepción tipo ZeroDivisionError:

def test_div_zero_exception():
    with pytest.raises(ZeroDivisionError):
        x = 1 / 0

Podemos almacenar la excepción para comprobar que contenía algo:
    with pytest.raises(KeyError) as ke:
        baz = my_map["baz"]

    assert "baz" in str(ke)


# fixtures
Papel similar al setUp() y tearDown() de unittest.
Definimos una función y le ponemos un decorador. Esta función se encargará, por ejemplo, de cargar los datos para los tests.

Para pasar fixtures a los test simplemente tenemos que poner un parámetro con el nombre de ese fixture.

Esas fixtures se ejecutarán antes que el código del test:

from pytest import fixture
@fixture
def local_fixture():
    print("\n(Doing Local Fixture setup stuff!)")

def test_with_local_fixture(local_fixture):
    print("Running test_with_local_fixture...")
    assert True


Podemos ver las fixtures definidas (disponibles) con:
pytest --fixtures
Tras cada fixture nos mostrará su `docstring`, si está definido.

Hay fixtures que vienen definidas con el propio pytest, por ejemplo, "capsys" nos permite catpurar lo escrito a stdout y stderr.
https://docs.pytest.org/en/latest/reference/reference.html#id33


Las fixtures pueden retornar datos, que será lo que reciba el test en su parámetro.

## yield (clean up)
Para poder hacer la funcionalidad de tearDown usamos yield en el fixture.
Lo que hacemos es usar yield para "enviar" el valor que queremos al test.
El fixture se quedará ahí esperando hasta que termine el test.
Una vez finalizado seguirá ejecutando (donde haremos el tearDown).

@pytest.fixture
def yield_fixture():
    x = {"foo": "bar"}
    yield x
    del(x)

CUIDADO si salta una excepción en la fixture, no se ejecutará el "tearDown". Mirar el finalizer del plugin "request".


## Fixtures en fixtures
Podemos pasar fixtures a las fixtures.
Generalemente lo que haremos es pasar una de las fixtures predefinidas para que la fixture que nosotros definimos tenga más potencial

El nombre del parámetro será la fixture que queremos usar, ej.:
@fixture
def mi_fixture(capsys):
  print("hacer algo con la fixture de capsys")



# Fixture plugins

## request
https://docs.pytest.org/en/latest/reference.html#request

### introspección
Si pasamos la fixture "requests" podemos obtener información sobre que test nos está llamando.
@pytest.fixture
def introspective_fixture(request):
    print(request.node)


### finalizer (clean up)
En este caso definimos una función (safe_clean) que siempre se ejecutará al terminar el test.

@pytest.fixture
def safe_fixture(request):
    print("\n(Begin setting up safe_fixture)")
    request.addfinalizer(safe_cleanup)
    risky_function()


### parametrización (similar a table driven tests)
Si queremos ejecutar un mismo test con distintos parámetros podemos pasar "params" en el decorador de un fixture y enviar esos parámetros
al test con yield.

def test_modes(mode):
    print("\n   Running test_modes with {}".format(mode))

@pytest.fixture(params=[1, 2, 3], ids=['foo', 'bar', 'baz'])
def mode(request):
    yield request.param

Esto ejecutará tres tests:
08_params_test.py::test_modes[foo], con "1" como argumento
08_params_test.py::test_modes[bar], con "2" como argumento
08_params_test.py::test_modes[baz], con "3" como argumento
