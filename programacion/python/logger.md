http://word.bitly.com/post/69080588278/logging-locals
Para crear un handler que nos de más información, por ejemplo las variables locales.


import logging

logger = logging.getLogger(__name__)
logging.basicConfig()
logger.setLevel(logging.DEBUG)

class ...

   logger.debug("Service %s scheduled each %s minutes" % (s[SERVICE_NAME],s[SERVICE_PERIOD])) 


Definir el nivel de logger externo a una app:
import logging
logging.basicConfig(level=logging.DEBUG)
from cinderclient.v2 import client as cn_client
cinder = cn_client.Client(auth_url='https://ost-controller-lb-dev.om-d.dsn.inet:35357/v2.0',username='monit_ost',api_key='RWAeL7xXfdxi',project_id='DSM-D',service_type='volume',insecure=True,http_log_debug=True)
cinder.volumes.list()
