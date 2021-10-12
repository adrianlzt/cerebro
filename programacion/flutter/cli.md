https://flutter.dev/docs/reference/flutter-cli

Crear nueva app
flutter create --org com.minombre nombreapp

Crear una app usando un código de ejemplo público

https://api.flutter.dev/flutter/material/Scaffold-class.html
flutter create --sample=material.Scaffold.1 mysample


Crear emulator
flutter emulators --create --name flutter

Arrancar emulator:
flutter emulators --launch flutter


Ver dispositivos donde podemos correr la app:
flutter devices


Ejecutar la app en un emulador o movil:
flutter run -d NAME

Hot reload
cuando estamos corriendo la app, podemos pulsar "r" para hacer un hot reload, mostrar cambios sin tener que hacer todo el proceso de build de nuevo, tarda menos de un segundo.
