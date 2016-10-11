Por defecto guarda las cosas en:
/tmp/appengine.xxx

# Debug
dev_appserver.py --log_level debug .

# Limpiar data store
Lanzar con:
--clear_datastore true

dev_appserver-go --clear_datastore true .


Si la consola interactiva no me funciona, probar con una sessión oculta de chrome:
http://localhost:8000/console


El código de la consola interactiva:
google_appengine/google/appengine/tools/devappserver2/admin/console.py
