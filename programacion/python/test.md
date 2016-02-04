http://www.openp2p.com/pub/a/python/2004/12/02/tdd_pyunit.html ANTICUADO
https://docs.python.org/2/library/unittest.html
dummy_test_suite.py
http://it-ebooks.info/book/3778/ Testing Python - Applying Unit Testing, TDD, BDD and Acceptance Testing

Mirar pytest.md

Mirar nosetests.md para buscar y ejecutar los tests


Test Driven Develop. La idea es primero desarollar las pruebas con los resultados que queremos y luego programar hasta pasar todos los tests.

## Utilidades ##
mock.md - It allows you to replace parts of your system under test with mock objects and make assertions about how they have been used
mockito.md - simular clases, más sencillo que mock. También permite "spy", chequear interacciones entre elementos.
nose.md - nose tools, decoradores para testear excepciones, tiempo, etc

## Conceptos ##

TestFixture (equipo de pruebas, juntamos todas las que tengan la misma necesidad en setUp, también es buena idea que testeen la misma clase), contiene:
setUp(), función donde creamos objetos, ficheros, etc, necesarios para las pruebas
tearDown(), generalmente no se usa. Seria para borrar las cosas del setUp(), pero el recolector de basura de python debería hacerlo por nosotros
test_XXX(self), son los propios tests, cada test tiene su setUp independiente, no afecta lo que hay en los otros tests.

test fixture: A test fixture represents the preparation needed to perform one or more tests, and any associate cleanup actions. This may involve, for example, creating temporary or proxy databases, directories, or starting a server process.

test case: A test case is the smallest unit of testing. It checks for a specific response to a particular set of inputs. unittest provides a base class, TestCase, which may be used to create new test cases.

test suite: A test suite is a collection of test cases, test suites, or both. It is used to aggregate tests that should be executed together.

test runner: A test runner is a component which orchestrates the execution of tests and provides the outcome to the user. The runner may use a graphical interface, a textual interface, or return a special value to indicate the results of executing the tests.


## Estructura de un test ##

@decoradores
def test_nombre(self,mock_*):
  # GIVEN
  definimos cosas necesarias

  # WHEN
  caso a analizar

  # THEN
  asserts probando cosas
end


## Asserts ##
assertEqual(a, b)                a == b   
assertNotEqual(a, b)             a != b   
assertTrue(x)                    bool(x) is True  
assertFalse(x)                   bool(x) is False   
assertIs(a, b)                   a is b  2.7
assertIsNot(a, b)                a is not b  2.7
assertIsNone(x)                  x is None 2.7
assertIsNotNone(x)               x is not None 2.7
assertIn(a, b)                   a in b  2.7
assertNotIn(a, b)                a not in b  2.7
assertIsInstance(a, b)           isinstance(a, b)  2.7
  assertIsInstance([1,2,3],list)
assertNotIsInstance(a, b)        not isinstance(a, b)  2.7
assertAlmostEqual(a, b)          round(a-b, 7) == 0   
assertNotAlmostEqual(a, b)       round(a-b, 7) != 0   
assertGreater(a, b)              a > b 2.7
assertGreaterEqual(a, b)         a >= b  2.7
assertLess(a, b)                 a < b 2.7
assertLessEqual(a, b)            a <= b  2.7
assertRegexpMatches(s, r)        r.search(s) 2.7
assertNotRegexpMatches(s, r)     not r.search(s) 2.7
assertItemsEqual(a, b)           sorted(a) == sorted(b) and works with unhashable objs 2.7
assertDictContainsSubset(a, b)   all the key/value pairs in a exist in b 2.7

Funcion:
perm.assert_called_with('FOO;bar', '/path/to/socket', None, auth='admin')

assertRaises(TipoDeExcepcion,funcion_que_tirara_exception,param1,param2)
mirar ejemplo al final

Usados para comparativas de elementos:
assertMultiLineEqual(a, b)       strings 2.7
assertSequenceEqual(a, b)        sequences 2.7
assertListEqual(a, b)            lists 2.7
assertTupleEqual(a, b)           tuples  2.7
assertSetEqual(a, b)             sets or frozensets  2.7
assertDictEqual(a, b)            dicts 2.7

Ejemplos:
self.assertEqual(self.seq, range(10))
self.assertTrue(element in self.seq)


## Ejecutar ##
La forma básica:
if __name__ == '__main__':
    unittest.main()

Una forma para tener mas control, menos output y sin la necesidad de ser ejecutada desde la command line:
suite = unittest.TestLoader().loadTestsFromTestCase(TestSequenceFunctions)
unittest.TextTestRunner(verbosity=2).run(suite)

La línea de comandos para ejecutar los tests (-v para más verboso):
python -m unittest test_module1 test_module2
python -m unittest test_module.TestClass
python -m unittest test_module.TestClass.test_method

Discover para encontrar los test:
python -m unittest discover -s . -p '*_test.py'


## Skip ##
https://docs.python.org/2/library/unittest.html#skipping-tests-and-expected-failures
Se pueden usar decoradores para evitar ejecutar un test. Por ejemplo solo ejecutar un test si usamos tal versión de una librería o si solo estamos en windows

    @unittest.skip("demonstrating skipping")
    def test_nothing(self):

    @unittest.skipIf(mylib.__version__ < (1, 3), "not supported in this library version")
    def test_format(self):

    @unittest.skipUnless(sys.platform.startswith("win"), "requires Windows")
    def test_windows_support(self):

    @unittest.skip("showing class skipping")
    class MySkippedTestCase(unittest.TestCase):

También se puede hacer un skip dentro de un método (por ejemplo dentro de setUp, o un test_ cualquiera):
return unittest.skip("razon")


## Test con directorio temporal ##
    def test_generate_project_files_create_dir_structure(self):

        icinga_base_dir = None

        try:
          # GIVEN
          project_name = "nombre"
          icinga_base_dir = tempfile.mkdtemp(dir="/tmp")

          # WHEN
          project_data = self.client.generate_project_files(project_name,icinga_base_dir)

          # THEN
          # estructura de ficheros generada?
        finally:
            if tmp_dir:
                shutil.rmtree(tmp_dir)


## Test que genera excepcion ##
from nose.tools import raises
...

    @raises(Exception)
    def test_should_is_mountpoint_writable_raise_exception_if_command_fails(self):
        # GIVEN
        mount_point = MountPoint()

        #WHEN
        mount_point.is_mountpoint_writable('fake_mount_point_location')


También podemos especificar la excepción, por ejemplo OSError para un error al crear un directorio
@raises(OSError)


Para hacerlo con assert, deberemos llamar dentro del assert a la funcion y pasar los parametros:
self.assertRaises(CyclopsException, self.api_client._obtain_task_id_from_location, url)
