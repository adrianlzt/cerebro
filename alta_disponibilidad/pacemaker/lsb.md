Este recurso es para arrancar servicios que usen scripts de init.d (tambien llamados scripts LSB, linux standar base)

primitive splunk_MASTERS-TEST lsb:splunk \
  op monitor interval="20s" \
  meta target-role="Started"

Esta es la configuración básica, donde le decimos que haga un /etc/init.d/splunk status cada 20 segundos, y que el servicio debe estar arrancado.


Al arrancar o parar los servicios, pacemaker va a darle un timeout de 20s (valor por defecto) al script, al cabo de ese tiempo lo dará por fallado.
Para aumentar este valor:

primitive splunk_MASTERS-TEST lsb:splunk \
  op monitor interval="20s" \
  op start interval="0" timeout="2min" \
  op stop interval="0" timeout="1min" \
  meta target-role="Started"

