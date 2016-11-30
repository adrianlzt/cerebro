http://nodemcu.readthedocs.org/en/dev/en/modules/tmr/

We're using the timer functions tmr.alarm() and tmr.stop(), it's the recommended way to run code at designated intervals since it's non-blocking.

local function wifi_wait_ip()
  ...
  tmr.stop(1)
  ...
end
tmr.alarm(1, 2500, 1, wifi_wait_ip)


tmr.alarm(REF, TIEMPO_MS, MODE, FUNCION)
REF: de 0 a 6
TIEMPO_MS tiempo en milisegundos
MODE:
  tmr.ALARM_SINGLE a one-shot alarm (and no need to call tmr.unregister())
  tmr.ALARM_SEMI manually repeating alarm (call tmr.start() to restart)
  tmr.ALARM_AUTO automatically repeating alarm
