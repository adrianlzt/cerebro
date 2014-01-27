http://graphite.readthedocs.org

Graphite does two things:

Store numeric time-series data
Render graphs of this data on demand
What Graphite does not do is collect data for you, however there are some tools out there that know how to send data to graphite. Even though it often requires a little code, sending data to Graphite is very simple.

Problems: It’s ugly, it’s time consuming to generate nice reports, its annoying to deploy.

Envío de datos:
For a singular script, or for test data, the plaintext protocol is the most straightforward method.
  PORT=2003
  SERVER=graphite.your.org
  echo "local.random.diceroll 4 `date +%s`" | nc ${SERVER} ${PORT};
For sending large amounts of data, you’ll want to batch this data up and send it to Carbon’s pickle receiver.
Finally, Carbon can listen to a message bus, via AMQP


Dashboard: https://github.com/ripienaar/gdash


Herramientas para graphite: https://graphite.readthedocs.org/en/latest/tools.html


Se puede usar StatsD para enviarle info (mirar statsd.md)

Mirar logs/logster.md para generar métricas a partir de ficheros de log
