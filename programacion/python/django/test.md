Ejemplo con una clase que implementa los metodos get, post, put y delete para facilitarnos los test

Lanzar los test de una app determinada:
python manage.py test NOMBRE_APP


# Esqueleto ejemplo
import json
from django.test import TestCase as DjangoTestCase
from django.conf import settings
from rest_framework import status


class TestCase(DjangoTestCase):
    def get(self, *args, **kwargs):
        return self.client.get(*args, content_type='application/json', **kwargs)

    def put(self, *args, **kwargs):
        return self.client.put(*args, content_type='application/json', **kwargs)

    def post(self, *args, **kwargs):
        return self.client.post(*args, content_type='application/json', **kwargs)

    def delete(self, *args, **kwargs):
        return self.client.delete(*args, content_type='application/json', **kwargs)


root = "/%s/" % settings.API_NAME

class ItemListControllerTest(TestCase):
    itemspath = root + 'items/'

    def test_get_list(self):
        response = self.get(self.itemspath)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        item = {"name": "Super item", "description": "This is the most amazing super item",
                "category": "Strange items", "price": 17.99
                }
        response = self.post(self.itemspath, data=json.dumps(item))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.content)

    def test_delete(self):
        response = self.delete(self.itemspath)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


# Coverage y nose test
For nose and coverage reporting use this settings: python manage.py test eshop --settings basesite.settingstests
Meter en projecto/projecto/settingstests.py

from settings import *

INSTALLED_APPS = INSTALLED_APPS + ('django_nose', )

TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

NOSE_ARGS = ['-s',
             '-v',
             '--cover-erase',
             '--cover-branches',
             '--with-cov',
             '--cover-xml',
             '--cover-package=frappe_api',
             '--cover-xml-file=../coverage.xml',
             '--with-xunit',
             '--xunit-file=../nosetests.xml'
             ]
