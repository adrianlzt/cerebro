#!/usr/bin/python2.7

# Crear fichero: run_tests.sh
# #!/bin/bash
# PYTHONPATH=src/nombre python tests/test_nombre.py


#from mockito import mock,when
from nose.tools import raises
from mock import patch
import unittest
import tempfile

#from clase_a_chequear import metodo1,metodo2

__author__ = 'alopez'


class NombreSuite(unittest.TestCase):

    def setUp():
        x = metodo1()

    #@patch(...)
    def test_funcion_nombre_descriptivo(self):
        # GIVEN
        s = 'srs'

        # WHEN
        x.cadena(s)

        # THEN
        self.assertTrue(x == 'pepe')

    #def tearDown():
    #    x = 0

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(NombreSuite)
    unittest.TextTestRunner(verbosity=2).run(suite)
