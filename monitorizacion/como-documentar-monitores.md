http://ryanfrantz.com/posts/alert-design/

How can this alert better define/illustrate what is broken?
  What threshold was met?
  What is the measured value versus the threshold?
What assumptions were made when the check was written?
  Could exposing those assumptions aid in resolving the issue?
What things can the operator look into, read, or test to better understand what’s happening?
  Can any of those things be automated or embedded in the alert?


La idea es que la alarma recolecte toda la información posible, para cuando vayamos a verla, de un vistazo, tengamos todos los datos que hubiesemos recabado nosotros a mano.

El email que envia Nagios/Icinga debería incluir más información.
Por ejemplo un top | head -5 de para alarmas de CPU.
O una captura de la gráfica de evolución del espacio en disco para alarmas de espacio insuficiente.
http://ryanfrantz.com/posts/introducing-nagios-herald/
https://github.com/etsy/nagios-herald
mirar en icinga-nagios/herald.md
