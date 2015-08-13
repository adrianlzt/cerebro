Para enviar alarmas a nagios usar el alerting de splunk y enviar checks pasivos.


Para usar splunk para tener info de icinga, consumir el status.dat y los logs de icinga.



# Envio de alarmas a icinga
Splunk hace búsquedas programas (normalmente 10-15min) y llama a un script
en el script tu pillas los datos haces las operaciones que sea para el alarmado y envias la info a iciinga

