http://pytest.org/latest/
Simple powerful testing with Python

Guía de como usarlos:
https://github.com/pluralsight/intro-to-pytest/blob/master/tutorials/01_basic_test.md

Hay muchos plugins para distintas librerías.



ejemplo_basico.py
def test_example():
    assert DATA_SET_A == DATA_SET_B

Lo ejecutamos con:
pytest ejemplo_basico.py

Subiendo nivel de debug, verbose (mostrar test a test) y seleccionando con una regexp (-k) que ejecutar:
pytest --log-level=DEBUG --log-cli-level=DEBUG -v -k test_worker_host_not_found_in_inventory


# assert
Hace mucha magía por debajo para comparar los distintos tipos de datos que puede haber.
Nos da el detalle de que falla
-v para ver el detalle
-vv toda la info disponible

# excepciones
Capturar una excepción.
Ejemplo, el test OK es que salte una excepción tipo ZeroDivisionError:

def test_div_zero_exception():
    with pytest.raises(ZeroDivisionError):
        x = 1 / 0

