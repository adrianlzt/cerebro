https://pypi.python.org/pypi/mock
http://www.voidspace.org.uk/python/mock/

It allows you to replace parts of your system under test with mock objects and make assertions about how they have been used.

pip install mock

Usar MagickMock() ?

Usar mejor mockito.



Una funcionalidad util es el decordador @patch
En este ejemplo hacemos que cuando dentro del test se ejecute "os.path.exists" devuelva el valor que definimos en la variable "mock_path.return_value"


# Mockear una función. Tenemos que poder pasar por parametro el mock
import unittest
from mock import Mock
from app.account import Account

class TestAccount(unittest.TestCase):
    def test_account_returns_data_for_id_1(self):
        account_data = {"id": "1", "name": "test"}
        mock_data_interface = Mock()
        mock_data_interface.get.return_value = account_data
        account = Account(mock_data_interface)
        self.assertDictEqual(account_data, account.get_account(1))


from mock import patch
import unittest
import os
class TestMock(unittest.TestCase):

  @patch('os.path.exists') # tenemos que pasar el classpath completo (aunque tengamos la función importada con from x import y)
  def test_dir(self, mock_path):
    # GIVEN
    mock_path.return_value = True

    #WHEN
    self.assertTrue(os.path.exists('/NoExiste'))

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(CheckFSWritableSuite)
    unittest.TextTestRunner(verbosity=2).run(suite)


# Otro ejemplo de patch de una funcion poniendo una virtual
src/agent/client.py
class Client(object):
    def post(self,...):

test.py:
...
    @patch('src.agent.client.Client.post')
    def test_register_host_returns_http_error_code(self,mock_post):
        # GIVEN
        mock = Mock()
        mock.metodo.return_value = 'blabla'
        mock_post.return_value = mock



# Parcheando varios metodos
@patch('src.agent.client.Client.get')
@patch('src.agent.client.Client.parse_json_from_cyclops')
def test_task_status_json_without_status(self, mock_json, mock_get):
    # GIVEN
    http_code = 200
    mock = Mock()
    mock.status_code = http_code
    #mock.parse_json_from_cyclops.return_value = {"updated_at": "2014"}
    mock_get.return_value = mock
    mock_json.return_value = {"updated_at": "2014"}

    # WHEN
    self.api_client.task_status(self.token_id)

    # THEN



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
    def test_funcion_llama_otra_funcion(self,mock)
        # WHEN
        self.client.funcion()

        # THEN
        self.assertTrue(mock.called)


El .called no parece que siempre me funciona. Otra opción:
    def test_execute_call_send_alarm_with_proper_params(self):
        # GIVEN
        api_client = Mock()
        api_client.send_alarm.return_value = True

        output = "test return"
        command = "/bin/echo " + output
        name = "echo_command"
        s = Service(name,command,1,api_client)

        # WHEN
        s.execute()

        # THEN
        api_client.send_alarm.assert_called_with(name, output, 0)


# Chequear que llaman a una funcion con unos parametros
api_client.py:
    def task_status(self,task_id):
        path = 'projects/'+self.project+'tasks/'+task_id
        response = self.client.get(path)

test_apiClient.py
    @patch('src.agent.client.Client.get')
    def test_task_status_create_correct_path(self, mock_get):
        # GIVEN
        mock = Mock()
        mock_get.return_value = mock

        # WHEN
        self.api_client.task_status(self.token_id)

        # THEN
        mock_get.assert_called_with('projects/fake_project/tasks/234987234657463525364758364abcde')


# Lanzar una excepcion cuando se llama a un método:
@patch("src.agent.api_client.ApiClient._get_task_status")
def test_send_alarm_task_status_raise_exception(self, mock_task_status):
    mock_task_status.side_effect = CyclopsTaskException("OK", "500", "message")


# Comprobar que se ha llamado a un método del mock con ciertos parámetros
mock = Mock()
s.api_client = mock
s.execute() ## llama a internamente a self.api_client.send_alarm(...)
mock.send_alarm.assert_called_with(hostname, name, output, 'OK')


# Patch el open de un file
@patch("__builtin__.open")
def test_xxx(self, mock_open):


# Falsear la lectura de un fichero
from mock import mock_open
def test_read_template(self):
    # Successful case with relative path
    with patch('__builtin__.open', mock_open()) as open_mock:
        open_mock().read.return_value = 'test template'

Se pueden encadenar patchs:
with patch("cyclops_agent.logger.config_logging") as mock, patch("cyclops_agent.agent") as mock2:
    ...


Si usamos
cosa.py:
from xxx import blabla

Al hacer el patch tendremos que hacerlo de
"cosa.blabla"



# Mock un import
https://stackoverflow.com/questions/8658043/how-to-mock-an-import

import sys
sys.modules['B'] = Mock()
import A
