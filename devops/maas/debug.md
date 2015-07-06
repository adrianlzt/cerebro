Para el server django:

Meter trazas de debug:
import logging
logger = logging.getLogger(__name__)
...
logger.error("cosa")

Cuando arranco django a mano no me funciona, meto trazas con
print("cosa")



# Web server
/usr/share/maas/maas_local_settings.py
DEBUG = True
FORCE_SCRIPT_NAME = ''

cd /usr/lib/python2.7/dist-packages
DJANGO_SETTINGS_MODULE=maas.settings PYTHONPATH=/usr/share/maas python ./django/conf/project_template/manage.py runserver 0.0.0.0:8080

Entrar en:
http://ip.add.re.ss:8080/

Si hay algun oops se generará en
/usr/lib/python2.7/dist-packages/logs/oops/


# Shell
DJANGO_SETTINGS_MODULE=maas.settings PYTHONPATH=/usr/share/maas python ./django/conf/project_template/manage.py shell
from maasserver.models import Node
Node.objects.all()
node = Node.objects.all().first()
from maasserver.models import Tag
tag=Tag.objects.all().first()
node.tags = [tag]
  en este momento habremos cambiado la tabla maasserver_node_tags

