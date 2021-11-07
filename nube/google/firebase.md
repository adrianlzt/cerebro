https://firebase.google.com/

Conjuto de servicios para simplificar la creación de aplicaciones.

# CLI
Arch aur/firebase-tools. Roto (20/8/2021)

Podemos bajar el binario: https://firebase.tools/bin/linux/latest

Logearnos con:
firebase login

En un directorio donde queramos almacenar cosas de firebase, ejecutar:
firebase init

Al final nos preguntará si queremos configurar los emuladores


# Emulator
https://firebase.google.com/docs/emulator-suite
Para poder testear localmente la funcionalidad de firebase.

Una vez configurado, arrancar con:
firebase emulators:start

Si queremos que las apps usando Firebase Admin SDK envien al emulador, en vez de al servidor real, definiremos variables de entorno
https://firebase.google.com/docs/emulator-suite/connect_firestore#instrument_your_app_to_talk_to_the_emulators

export FIRESTORE_EMULATOR_HOST="localhost:8080"


# Python
https://firebase.google.com/docs/firestore/quickstart?authuser=0#python
firebase-admin

Podemos hacer pruebas entrando en la google cloud shell:
pip3 install firebase_admin
export GOOGLE_CLOUD_PROJECT=nombre-proyecto
$ python
from firebase_admin import messaging, initialize_app, get_app, firestore
initialize_app()
get_app()
db = firestore.client()

Actualizar un doc:
obj.reference.update({"ack": True})



# Realtime database
https://firebase.google.com/docs/database
Store and sync data with our NoSQL cloud database. Data is synced across all clients in realtime, and remains available when your app goes offline.



# Firestore
BBDD noSQL
Producto de google cloud.

Límites y cuotas: https://firebase.google.com/docs/firestore/quotas#collections_documents_and_fields

## Seguridad y validación
Ejemplo definiendo unas reglas de seguridad y validación a la hora de leer/escribir en una collection
https://firebase.google.com/codelabs/firebase-get-to-know-flutter#7

Ejemplo de reglas que permite read para todo menos collection user.
Permite escritura/lectura para usuarios authuser
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
 		match /{collectionName}/{documentId} {
  		allow read : if collectionName != "users";
      allow read, write : if request.auth != null;
		}
  }
}

## curl
curl https://firestore.googleapis.com/v1/projects/NOMBREPROYECTO/databases/\(default\)/documents/NOMBRECOLLECTION

## Python
https://googleapis.dev/python/firestore/latest/client.html
google-cloud-firestore
Si hemos instalado "firebase-admin" ya tendremos esta lib.

Parece que es equivalente importar de estas maneras:
from firebase_admin import firestore
from google.cloud import firestore

Ejemplos:
https://github.com/GoogleCloudPlatform/python-docs-samples/blob/master/firestore/cloud-client/snippets.py

Si no inicializamos el id del documento, asignará uno aleatorio:
doc_ref = self.db.collection(u'gnss').document()

Escribir datos ("doc" podemos ponerlo sin parámetros para generar un id random)
db.collection(u'data').document(u'one').set(data)

Obtner datos
users_ref = db.collection(u'users')
docs = users_ref.stream()
for doc in docs:
    print(f'{doc.id} => {doc.to_dict()}')

### Tipos de datos
Ejemplos de tipos de datos: https://firebase.google.com/docs/firestore/manage-data/add-data

#### Geopoint
u'location': firestore.GeoPoint(latitude, longitude),

#### Date
u'dateExample': datetime.datetime.now(),



# Cloud functions
mirar cloud_functions.md



# Auth
Podemos usar distintos proveedores.
Desde email/password, email/no-password, google, microsoft, github, etc



# Cloud message
Enviar mensajes push a los usuarios: notificaciones o aviso de que tienen algo que sincronizar.

Podemos usar la consola de firebase para enviar mensajes:
https://console.firebase.google.com/project/korea-controller/notification

Mirando como hacía la consola para enviar mensajes a todos los users de una app vi que en el request metía algo tipo:
targetingCondition: "app.id == '1:3563559:android:1dbd4837fff0e'"
Pocos días después parece que han cambiado el formato:
"appId": { "targetGmpAppId": "1:3579:android:1cbd649ffe" }
No parece seguro basarse en este método para enviar notificaciones.

Lo he metido en el código y funciona:

message = messaging.Message(
    android=android,
    condition="app.id == '1:356359:android:1cd0647af8e'"
)

Ese código está en el json que nos bajamos de firebase para meter en la app: client.mobilesdk_app_id





# In-App Messaging
Mensajes que se muestran cuando estamos dentro de la app.
La lógica la tiene la propia app.
Por ejemplo, si no has usado determinada funcionalidad, recordarlo cada X



# Dynamic Links
Generar links que se abren en la app.
Si no se tiene instalada, primero se lleva al store y una vez instalada se abre el link en la app.



# Performance Monitoring
Monitorizar la app desde el punto de vista del usuario


# Remote Config
Poder modificar ciertos parámetros de la app remotamente sin sacar nuevas versiones


# Analytics
Métricas sobre los usuarios


# Crashlytics
Información cuando casca la app


# Cloud Storage
Almacenar objetos?


# ML Kit Vision
Modelo para poder reconocer cosas en imágenes/videos


# ML Custom
Modelos custom de tensorflow


# App check
https://firebase.google.com/docs/app-check
App Check works alongside other Firebase services to help protect your backend resources from abuse, such as billing fraud or phishing. With App Check, devices running your app will use an app or device attestation provider that attests to one or both of the following
    Requests originate from your authentic app
    Requests originate from an authentic, untampered device


# AdMob
targeted, in-app advertising
