# Webhooks
Media types donde podemos programar, en JS, como interactuar con un server externo.
https://www.zabbix.com/documentation/6.0/en/manual/config/notifications/media/webhook

Para desarrollar uno custom:
https://www.zabbix.com/documentation/guidelines/en/webhooks

En la lista de MediaTypes nos aparece a la derecha un botón "test".
Con el podemos probar el media type.
Tras ejecutarlo abajo del todo podemos ver el log de ejecución.
Estos logs se meten como:
Zabbix.log(4, '[ ServiceNow Webhook ] Received response with status code ' + request.getStatus() + '\n' + response);

Niveles:
 4 - Debug
