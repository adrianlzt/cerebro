import os
import sys

sys.path.append('C:/Django')
sys.path.append('C:/Django/t4uAdmin')

os.environ['DJANGO_SETTINGS_MODULE'] = 't4uAdmin.settings'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()	

