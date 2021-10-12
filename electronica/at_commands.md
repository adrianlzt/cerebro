https://www.sparkfun.com/datasheets/Cellular%20Modules/AT_Commands_Reference_Guide_r0.pdf
https://www.waveshare.com/w/upload/2/20/SIM800_Series_AT_Command_Manual_V1.09.pdf


ATI
  información del dispositivo

AT+COPS?
  información de la red
    +COPS: 0 No carrier/operator
    +COPS: 0,0,"T-Mobile",7 Registered on T-Mobile
    +CME ERROR: 10 No SIM

AT+CGREG?
  registration status, https://m2msupport.net/m2msupport/atcgreg-gprs-network-registration-status/

ATD+346xxxxxxxx;
  para llamar, no olvidar el ";" final

ATA
  contestar

ATH
  colgar


Enviar SMS
https://www.diafaan.com/sms-tutorials/gsm-modem-tutorial/at-cmgs-text-mode/
AT+CMGF=1
AT+CMGS="+34610745229"
> texto
control+z para terminar (puede tardar unos segundillos en salir del prompt del mensaje)
Contesta con (35 es el "msg reference"):
+CMGS: 35
