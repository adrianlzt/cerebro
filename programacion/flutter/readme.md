https://flutter.dev/

SDK para crear aplicaciones para android, ios, web, nativas y embedded.
Por ejemplo, nos provee de un sistema de auth que puede usar cualquier de los proveedores típicos (google, github, email/password)


# Install
Instalar con yay (arch linux):
    flutter
    dart
Para instalar el SDK de android y una plataforma (versión) en concreto, con yay:
    android-sdk
    android-sdk-cmdline-tools-latest
    android-sdk-platform-tools
    android-sdk-build-tools
    android-platform-30 (esta es para v11)
    android-sdk-build-tools-29.0.2 (me fallaba el flutter run porque no tenía ese paquete)

Parece que es más sencillo tener el SDK en nuestro home ~/Android que usar uno en el sistema
flutter config --android-sdk ~/Android/Sdk

Ejecutar
flutter doctor -v

Tuve que ejecuter flutter con sudo para aprobar las licencias.

Si falla el comando --android-licenses, es que nos falta /android-sdk-cmdline-tools-latest
Instalar "Android SDK Command-line Tools" desde el SDK Tools de android-studio

https://wiki.archlinux.org/title/Android_(Espa%C3%B1ol)#Cambiar_el_due%C3%B1o_de_/opt/android-sdk
Cambiar permisos de /opt/android-sdk para poder escribir?


# Channel
Que versión usamos, generalemnte usaremos "stable"


# Dependencias
Las añadimos en pubspec.yaml

Una vez añadidas las instalamos con:
flutter pub get


# IDE
mirar vim.md

Con android studio
Instalar plugin para flutter
Al crear un nuevo proyecto, seleccionar el SDK en /opt/flutter
Dejar klotin como lenguaje para android, en realidad usará dart
Para crear un virtual device, tools -> ADV

visual-studio
instalar plugin de flutter
https://flutter.dev/docs/get-started/test-drive?tab=vscode
Para crear un virtual device parece que se más fácil con android-studio



# Organización
mirar estructura.md


# Despliegue
mirar cli.md
