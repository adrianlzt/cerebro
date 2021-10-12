https://firebase.flutter.dev/docs/overview/
https://firebase.flutter.dev/
https://pub.dev/packages/firebase_core/example

https://firebase.google.com/codelabs/firebase-get-to-know-flutter#3
Para añadir firebase a nuestra app fluter:
 - añadir las dependencias a la app-flutter
 - obtener las credenciales
 - añadir google-services a la app android

# Inicializar FlutterFire
https://firebase.flutter.dev/docs/overview/#initializing-flutterfire

Para poder usar cualquiera de los servicios de Firebase tenemos que inicializar Flutterfire

Añadir a pubspec.yaml las siguientes dependencias
  firebase_auth: ^1.0.0

Tendremos que dar cada app de alta en la consola de firebase


## iOS
leer doc

## Android
Credenciales
En la consola de firebase, añadir la app android.
Debajo de nombre hay un "+"
Seleccionar android
Pondremos el id de la app (com.example.foo)
En el código de flutter lo tendremos en android/app/src/main/AndroidManifest.xml
Al registrar la app nos baja un fichero .json (las credenciales) que dejaremos en android/app

android/build.gradle
añadir a las dependencias
classpath 'com.google.gms:google-services:4.3.5'

android/app/build.gradle
  añadir plugin
    apply plugin: 'com.google.gms.google-services'

  subir la minSdkVersion de android.defaultConfig a 21

  poner nuestro id en android.defaultConfig.applicationId


## Web
Del snippet HTML que nos da al generar la app, copiarnos el JSON firebaseConfig al código de nuestra app: web/index.html

Algo así:
<body>
  <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-firestore.js"></script>
  <script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "..",
      authDomain: "XXX.firebaseapp.com",
      atabaseURL: "https://XXX-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "XXX",
      storageBucket: "XXX.appspot.com",
      messagingSenderId: "...",
      appId: "1:..."
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  </script>
  ...



## Dart
https://firebase.flutter.dev/docs/

import 'package:firebase_core/firebase_core.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

# Firestore
https://firebase.flutter.dev/docs/firestore/usage/
https://pub.dev/packages/cloud_firestore
https://firebase.google.com/codelabs/firebase-get-to-know-flutter#5

Leer un único dato y pintarlo.
Necesitamos usar un FutureBuilder para gestionar el futuro que nos da firestore
https://firebase.flutter.dev/docs/firestore/usage/#one-time-read

Crear documento:
FirebaseFirestore.instance.collection('guestbook').add(<String, dynamic>{
      'text': message,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
      'name': FirebaseAuth.instance.currentUser!.displayName,
      'userId': FirebaseAuth.instance.currentUser!.uid,
    });

Subcribirse a cambios en una collection (hace falta desubcribrse al salir):
 _guestBookSubscription = FirebaseFirestore.instance
     .collection('guestbook')
     .orderBy('timestamp', descending: true)
     .snapshots()
     .listen(snapshot)

Si tenemos un geopoint
https://pub.dev/documentation/cloud_firestore_platform_interface/latest/cloud_firestore_platform_interface/GeoPoint-class.html


# Cloud message
https://firebase.flutter.dev/docs/messaging/overview/

import 'package:firebase_messaging/firebase_messaging.dart';

Si queremos obtener el token del dispositivo, para poder enviar mensajes de prueba
String? token = await FirebaseMessaging.instance.getToken();
print("token: $token") // lo saca por la consola al correr la app con flutter


Los mensajes que enviemos a la app se manejan de manera distinta si la app está:
  - foreground (onMessage)
  - background (onBackgroundMessage)
  - terminated/not running (onBackgroundMessage)

Hay algunas condiciones para recibir mensajes, en android tiene que haberse abierto al menos una vez, para haber hecho la inicialización.

Los mensajes pueden ser:
  - notifications
  - data (ignorados en background o terminated, tenemos que explicitar priority=high si queremos que no sean ignorados, Note; this does still not guarantee delivery.)
  - both

Si estamos en foreground, las notificaciones no se mostrarán a no ser que sean de un "high priority" channel.
