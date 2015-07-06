Estadisticas del funcionamiento de logstash:
https://gist.github.com/paulczar/4513552


Datos de la conferencia.
http://www.youtube.com/watch?feature=player_embedded&v=RuUFnog29M4#t=1392

20k apache/sec peak
250M events/day
75GB/day
160 web server

7 logstash/elasticsearch servers



Logstash aprovecha el multicore gracias a jRuby



Otro proyecto:
11 nodos de ES
3 de kafka (retienen los datos ahí 7 días)
Amazon en Oregon con máquinas xlarge y 2xlarge
Tienen indexados 3 billones de documentos
