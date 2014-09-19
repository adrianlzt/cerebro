https://pypi.python.org/pypi/mock
http://www.voidspace.org.uk/python/mock/

It allows you to replace parts of your system under test with mock objects and make assertions about how they have been used.

pip install mock


Usar mejor mockito.



Una funcionalidad util es el decordador @patch
En este ejemplo hacemos que cuando dentro del test se ejecute "os.path.exists" devuelva el valor que definimos en la variable "mock_path.return_value"


from mock import patch
import unittest
import os
class TestMock(unittest.TestCase):

  @patch('os.path.exists')
  def test_dir(self, mock_path):
    # GIVEN
    mock_path.return_value = True

    #WHEN
    self.assertTrue(os.path.exists('/NoExiste'))

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(CheckFSWritableSuite)
    unittest.TextTestRunner(verbosity=2).run(suite)



# Chequear si una función llama a otra

provisioners/icinga/client.py:
Class Client(object):
    def funcion(self):
        otra_funcion()

    def otra_funcion():
        return True


tests/test_client.py:
from mock import patch
import unittest
from provisioners.icinga.client import Client

Class ClientSuite(unittest.TestCase);
    def setUp(self):
        self.client = Client()

    @patch('provisioners.icinga.client.Client.otra_funcion')
    def test_funcion_llama_otra_funcion(self):
        # GIVEN

        # WHEN
        self.client.funcion()

        # THEN
        self.assertTrue(mock.called)


