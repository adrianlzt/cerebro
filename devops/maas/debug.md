Para el server django:

Meter trazas de debug:
import logging
logger = logging.getLogger(__name__)
...
logger.error("cosa")




/usr/share/maas/maas_local_settings.py
FORCE_SCRIPT_NAME = ''

root@maas-server:/usr/lib/python2.7/dist-packages# DJANGO_SETTINGS_MODULE=maas.settings PYTHONPATH=/usr/share/maas python ./django/conf/project_template/manage.py runserver 0.0.0.0:8000
