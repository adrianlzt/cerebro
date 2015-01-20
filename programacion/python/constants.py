Mejor meter estas constantes en cada módulo (en cada fichero .py)
Si los tenemos que reutilizar, importarlos desde la clase donde estén definidos.
Usar un fichero de constants luego es un saco donde van muchas cosas, algunas se quedan sin usar, o son antiguas, etc.


#Log level
LOG_LEVEL_DEBUG = 'DEBUG'
LOG_LEVEL_INFO = 'INFO'
LOG_LEVEL_WARNING = 'WARNING'
LOG_LEVEL_ERROR = 'ERROR'

#Defaults
COUNTRY = 'ES'
APP_JSON = 'application/json'
DEF_HTTPS_PORT = 443
DEF_HTTPS_CERTFILE = '/var/run/directorio/fichero.pem'


# Para usarlo:
# from constants import COUNTRY
# ...
# var = COUNTRY
