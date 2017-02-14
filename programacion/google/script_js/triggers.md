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


# Test
http://stackoverflow.com/questions/16089041/how-can-i-test-a-trigger-function-in-gas


# Errores
Se llama a la función trigger muchas veces -> mirar a ver si tenemos el trigger definido varias veces

No consigo recuperar los valores con un trigger sobre un formulario. Al final lo he hecho con el trigger sobre la hoja excel que recibe los valores.
Siempre devuelve algo tipo
{
  "response": {},
  "source": {},
  "authMode": {},
  "triggerUid": 528490824
}


