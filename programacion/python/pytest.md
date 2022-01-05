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
Podemos poner funciones `test_` fuera de ficheros `_test.py`, pero tendremos que especificar ese fichero a pytest para que lo ejecute.

Cada test individual será una función que comience por `test_`

"conftest.py" es un fichero especial que se buscará en el path actual y en los paths padres.
En él podemos, entre otras cosas, definir fixtures globales.



# Test básico
ejemplo_basico.py
def test_example():
    assert DATA_SET_A == DATA_SET_B

Lo ejecutamos con:
pytest ejemplo_basico.py


# Debug:
Subiendo nivel de debug
--log-level=DEBUG --log-cli-level=DEBUG

verbose (mostrar test a test) y seleccionando con una regexp (-k) que ejecutar:
-v

-s
Para ver los print que hayamos puesto.

# Selecionar tests
Ejecutar los tests de un fichero:
pytest 10_mark_test.py

Un test en concreto de un fichero:
pytest 10_mark_test.py::test_fake_query

Una parametrización en concreto:
pytest -vs "10_advanced_params-ception_test.py::test_advanced_fixtureception[d-4]"

Los tests que matcheen la expresión:
pytest -k foo
pytest -k "foo or bar"

Selecionar usando marks:
pytest -m db
pytest -m "db and not slow"


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



# skip test
Podemos llamar a `pytest.skip()` para saltarnos un test.
Podemos ejecutarlo también dentro de un fixture.

Skipear un fichero entero.
pytest.skip("This whole Module is problematic at best!", allow_module_level=True)

Mirar también los skips condicionales con pytest.mark




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


## autouse
https://docs.pytest.org/en/latest/fixture.html

Podemos marcar una fixture con "autouse=True" para que se coja forzadamente en todos los tests.
Tendremos que pasar un parámetro a los tests para que coja el valor de la fixture (dará igual el nombre):

@fixture(autouse=True)
def scoped_fixture():
    print("fixture")

def test_scoped_fixtures():
    pass


## capsys / capturar stdout/stderr
def test_get_ifaces(capsys):
    ejecutar_test()                 # IMPORTANTE, el readouterr debe ir después de ejecutar la función que genera el stdout/err
    captured = capsys.readouterr()
    assert captured.out == "foo"



## Ejecutar una fixture una única vez
Al configurar el scope="module", esta fixture solo se ejecutará con la ejecución del primer test.

@fixture(scope="module", autouse=True)
def scoped_fixture():
    yield ExpensiveClass()


@mark.parametrize("x", range(1, 51))
def test_scoped_fixtures(x):





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

También se puede aplicar parametriación directamente a un test con los marks.

def test_modes(mode):
    print("\n   Running test_modes with {}".format(mode))

@pytest.fixture(params=[1, 2, 3], ids=['foo', 'bar', 'baz'])
def mode(request):
    yield request.param

Esto ejecutará tres tests:
08_params_test.py::test_modes[foo], con "1" como argumento del test
08_params_test.py::test_modes[bar], con "2" como argumento del test
08_params_test.py::test_modes[baz], con "3" como argumento del test

Si no definimos el parámetro "ids", el nombre usado será el mismo valor de "params".

En el fixture podemos hacer cosas más complejas antes de devolver el resultado.
Tal vez el "param" solo es una parte de un objeto que queremos enviar.


Si tenemos varios parámetros y queremos añadir una fixture, la pondremos al final. Ejemplo:
def test_get_ifaces(config, interfaces, expected, capsys):


#### multiple parametrización
Si pasamos a un test dos fixtures que le envían datos, se ejecutará el test combinando todos los posibles resultados (producto cartesiano).

@pytest.fixture(params=["a", "b", "c", "d"])
def letters_fixture(request):
    yield request.param


@pytest.fixture(params=[1, 2, 3, 4])
def numbers_fixture(request):
    yield request.param


def test_fixtureception(letters_fixture, numbers_fixture):
    coordinate = letters_fixture + str(numbers_fixture)

Tendemos los tests a1, a2, a3, a4, b1, b2, etc



Otra manera es pasar un fixture al otro fixture. Y ese segundo fixture al test.
De esta manera tenemos más control sobre que se está pasando finalmente al test.

@pytest.fixture(params=[1, 2, 3, 4])
def numbers_fixture(request):
    yield request.param


@pytest.fixture(params=["a", "b", "c", "d"])
def coordinates_fixture(request, numbers_fixture):
    coordinate = request.param + str(numbers_fixture)
    yield coordinate


Si por algún caso termináse llegando un fixture dos veces al mismo test (heradado por un lado y directamente, por ejemplo),
pytest se da cuenta y solo lo "importa" una vez.




## Monkey-patching
https://docs.pytest.org/en/6.2.x/monkeypatch.html
Nos permite modificar objetos, diccionarios, os.environ.


## Mock
https://github.com/pytest-dev/pytest-mock/
Se instala a parte.
pip install pytest-mock

Nos permite modificar el funcionamiento de librerías.
El típico caso de simular una respuesta de una db, llamada http, etc.

Ejemplos:
https://github.com/pluralsight/intro-to-pytest/blob/master/tests/18_the_mocker_fixture.py
https://github.com/pluralsight/intro-to-pytest/blob/master/tests/19_re_usable_mock_test.py






# Test marking
Podemos añadir marks a los tests para agruparlos.
Sería como tagearlos.

@pytest.mark.db
@pytest.mark.slow
def test_fake_multi_join_query():


## Skip
@pytest.mark.skip
def test_broken_feature():


@pytest.mark.skipif(not dev_s3_credentials, reason="S3 creds not found!")
def test_s3_api():


## Permitir fallos
Pondrá XPASS para cuando ha salido bien el test pero estaba marcado que permitía fallo.
XFAIL si ha fallado y tenía permitido fallo.

@pytest.mark.xfail

@pytest.mark.xfail

@pytest.mark.xfail(strict=True)
En este caso, si no falla, el test será FAILED.


## Parametrización
De esta manera podemos aplicar parametrización directamente sobre los tests.
Otra opción es parametrización mediante fixtures.

Ejemplos: https://docs.pytest.org/en/latest/example/parametrize.html

@pytest.mark.parametrize("number", [1, 2, 3, 4, 5])
def test_numbers(number):

@pytest.mark.parametrize("x, y", [(1, 1), (1, 2), (2, 2)])
def test_dimensions(x, y):

@pytest.mark.parametrize("mode", [1, 2, 3], ids=['foo', 'bar', 'baz'])
def test_modes(mode):


Típico ejemplo de table driven tests (retuerzo un poco la sintaxis para poder meter el nombre del test en la misma línea de los datos):

interfaces_elements = [
    ("nombre test", {"params": "entrada"}, {"expected": "values"})
]


@pytest.mark.parametrize("params,expected", [(x[1], x[2]) for x in interfaces_elements], ids=[x[0] for x in interfaces_elements])
def test_parse_interfaces_elements(params, expected):
    assert params == expected




# Clases
Podemos organizar los tests en clases.
https://github.com/pluralsight/intro-to-pytest/blob/master/tests/14_class_based_test.py

Ejemplo usando fixtures:
https://github.com/pluralsight/intro-to-pytest/blob/master/tests/15_advanced_class_test.py


# Coverage
pip install pytest-cov
pytest --cov

Si queremos un reporte en html
pytest --cov-report html --cov

Lo genera en htmlcov/
