https://developers.google.com/apps-script/guides/triggers/events
https://developers.google.com/apps-script/reference/script/

Se pasa un parametro (generalmente llamado e) con la info.


Para un onSubmit de un form

function inicia(e) {
  items = e.response.getItemResponses();
  items[0].getResponse();
}


Si queremos ver los triggers configurados:
Recursos -> Activadores del proyecto activo

En Ver -> Transcripción de la ejecucción, podemos ver las trazas de la última ejecucción.
Si es un trigger que ha ejecutado la función también lo veremos.


# Errores
Se llama a la función trigger muchas veces -> mirar a ver si tenemos el trigger definido varias veces
