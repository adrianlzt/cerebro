#!/usr/bin/python2.7
from nose.tools import raises
from mock import patch
import unittest
import tempfile
import shutil
import os

from app.client import Client

__author__ = 'alopez'

class AppThingSuite(unittest.TestCase):

    project_name = None

    def setUp(self):
        self.client = Client()
        self.project_name = "nombre"

    @patch('app.client.Client.generate_project_files')
    def test_add_project_return_dict_is_correct(self,mock):
        # GIVEN
        project_id = self.project_name

        # WHEN
        project_data = self.client.add_project(self.project_name)

        # THEN
        project = project_data['project']
        id = project_data['id']
        token = project_data['token']
        self.assertTrue(len(token) == 32)

if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(AppThingSuite)
    unittest.TextTestRunner(verbosity=2).run(suite)
