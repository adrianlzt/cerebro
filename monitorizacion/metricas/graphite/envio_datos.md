Envío de datos:
For a singular script, or for test data, the plaintext protocol is the most straightforward method.
  PORT=2003
  SERVER=graphite.your.org
  echo "local.random.diceroll 4 `date +%s`" | nc ${SERVER} ${PORT};
For sending large amounts of data, you’ll want to batch this data up and send it to Carbon’s pickle receiver.
Finally, Carbon can listen to a message bus, via AMQP
