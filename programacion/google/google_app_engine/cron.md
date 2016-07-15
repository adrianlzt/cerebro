https://cloud.google.com/appengine/docs/python/config/cron

Cron hace un get a una de nuestras URLs, esta debe devolver un codigo 2xx
En el entorno de desarrollo NO se lanzan.

cron:
- description: daily summary job
  url: /tasks/summary
  schedule: every 24 hours


Esquema de alarmado:
every N (hours|mins|minutes) ["from" (time) "to" (time)]


Podemos verlo en la consola administrativa:
Para el entorno de desarrollo:
http://localhost:8000/cron

appcfg.py cron_info .

# Actualizar solo el cron
appcfg.py update_cron .

# Borrar crons
Dejar el cron.yml a
cron:

y actualizar:
appcfg.py update_cron .
