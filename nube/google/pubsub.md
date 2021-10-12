Ejemplo enviando con mqtt y disparando cloud function.

Para el setup de mqtt mirar iot.md
Tras esa config, lo que enviemos se publicará en un topic, por ejemplo:
projects/PROYECTO/topics/NOMBRE

Luego desplegaremos una cloud function disparada por publicaciones a ese topic
gcloud functions deploy geofencing --runtime python39 --trigger-event=google.pubsub.topic.publish --trigger-resource NOMBRE_TOPIC


Para probar podemos usar gcloud para publicar mensajes:
gcloud pubsub topics publish NOMBRE_TOPIC --message '{"name":"Xenia"}'
