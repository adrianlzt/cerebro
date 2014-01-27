Se recogen eventos en Nagios/Icinga, sensu o cron, se genera un json que es envíado a un processor. Este genera una notificaciónes que es pasada a los gateways.

Los eventos son ficheros json.

Flow:
  event --> filters ------------------------------------------------> alert
              a quien le interesa la notificacion
	      que medios de avisar para las personas interesadas
	      borrar ciertas parejas de persona,medio por razones 
	        de tags, severidad, hora, ...
	        'blackholes' ¿?
	        intervalos de notificación

Getaways:
  email
  sms
  jabber
  pagerduty

El 'core' de flapjack sería el procesador+notificador, basados en redis con una web y una API


Escalabilidad:
  bulletproof lo usa en producción, 60 eventos / seg


Notificación:
  Te avisa cada x minutos si el check sigue fallando.
