https://cloud.google.com/functions
https://console.cloud.google.com/functions/list

Ejemplos multilenguaje:
https://cloud.google.com/functions/docs/samples

Ejemplos de código javscript/firebase:
https://github.com/firebase/functions-samples

Dentro de firebase:
https://firebase.google.com/docs/functions
Con la cli de firebase solo me deja usar typescript/javascript.
Pero podemos usar gcloud para desplegar en el resto de lenguajes (python, go, etc)

Aplicaciones en typescript/javascript que se ejecutan en base a eventos.


Es lento en desplegar, ~2'

Máximo tiempo de ejecución:
By default, a function times out after 1 minute, but you can extend this period up to 9 minutes.


# Triggers
Tipos de eventos que puedes usarse como disparadores:
https://firebase.google.com/docs/reference/functions/cloud_functions_.eventcontext#eventtype

--trigger-event
google.analytics.event.log
google.firebase.auth.user.create
google.firebase.auth.user.delete
google.firebase.database.ref.write
google.firebase.database.ref.create
google.firebase.database.ref.update
google.firebase.database.ref.delete
google.firestore.document.write
google.firestore.document.create
google.firestore.document.update
google.firestore.document.delete
google.pubsub.topic.publish
google.firebase.remoteconfig.update
google.storage.object.finalize
google.storage.object.archive
google.storage.object.delete
google.storage.object.metadataUpdate
google.testing.testMatrix.complete

--trigger-resource
Analytics — projects/<projectId>/events/<analyticsEventType>
Realtime Database — projects/_/instances/<databaseInstance>/refs/<databasePath>
Storage — projects/_/buckets/<bucketName>/objects/<fileName>#<generation>
Authentication — projects/<projectId>
Pub/Sub — projects/<projectId>/topics/<topicName>  (si desplegamos con gcloud, solo pasaremos el topicName a trigger-resource)


# Logs
Desde la consola web o con gcloud:
gcloud functions logs read hello_http

O en la consola general de logs
https://console.cloud.google.com/logs


# Desarrollo con firebase
https://firebase.google.com/docs/functions/get-started

Usar firebase init, que nos creará un directorio con todo el scaffold necesario.

Desarrollar probando con el emulador.

package.json file describing your Cloud Functions code
src/index.ts fichero con las cloud functions

Las funciones que definamos estarán disponibles en (en el emulador):
http://localhost:5001/NOMBRE_DEL_PROJECTO/us-central1/helloWorld


## Firebase triggers
https://cloud.google.com/functions/docs/calling/cloud-firestore
https://cloud.google.com/functions/docs/samples/functions-firebase-firestore

Trigger por un write en firestore
--trigger-event=providers/cloud.firestore/eventTypes/document.write
--trigger-resource "projects/YOUR_PROJECT_ID/databases/(default)/documents/PATH"

Como especifiar el path: https://cloud.google.com/functions/docs/calling/cloud-firestore#specifying_the_document_path
Podemos usar wildcard, para coger nuevos documentos, ejemplo:
projects/YOUR_PROJECT_ID/databases/(default)/documents/messages/{pushId}

Ejemplo del campo data pasado (en python son todo type dict):
{
    'oldValue': {},
    'updateMask': {},
    'value': {
        'createTime': '2021-08-23T06:13:17.618431Z',
        'fields': {
            'coordinates': {
                'geoPointValue': {
                    'latitude': 41.3,
                    'longitude': 4.4
                }
            }
        },
        'name': 'projects/korea-controller/databases/(default)/documents/vehicle_position/YMHo2xlWojrJMCxJknpU',
        'updateTime': '2021-08-23T06:13:17.618431Z'
    }
}


Ejemplo del campo context:
{
    event_id: ea4cfa3c-3b06-40ef-80d3-638fc71c78bc-0,
    timestamp: 2021-08-23T06:13:17.618431Z,
    event_type: providers/cloud.firestore/eventTypes/document.write,
    resource: projects/korea-controller/databases/(default)/documents/vehicle_position/YMHo2xlWojrJMCxJknpU
}

# Python (gcloud)
https://cloud.google.com/functions/docs/quickstart-python
https://cloud.google.com/functions/docs/first-python

Ficheros:
    main.py
    requirements.txt (opcional)

Deploy (nombre de la función):
gcloud functions deploy hello_http --runtime python39 --trigger-http --allow-unauthenticated


La fecha del context.timestamp es una string con formato: 2021-08-26T06:51:55.803Z


Para usar firebase usamos la librería: https://pypi.org/project/firebase-admin/


Ejemplo enviando mensajes con cloud message:
https://github.com/firebase/firebase-admin-python/blob/master/snippets/messaging/cloud_messaging.py
https://firebase.google.com/docs/cloud-messaging/send-message
