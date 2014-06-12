Que un check cuando salte a critical se mantenga en ese estado hasta hacerle un ack o algo asi.
No hay solución integrada.

http://support.nagios.com/forum/viewtopic.php?f=7&t=25228

Un eventhandler que desactive los checks activos cuando el service se ponga en critical o warning.

Configurar el service como pasivo y cuando se ponga a warning o critical, restaurarlo a mano a OK.
