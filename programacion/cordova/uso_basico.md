https://cordova.apache.org/docs/en/latest/guide/cli/

# Create a project
cordova create MyApp
  si no decimos nada sera io.cordova.hellocordova:w

cordova create nombredir com.nombre.app NombreBonito
cd MyApp


# Plataformas
Listar plataformas disponibles:
cordova platform

Añadir plataforma
cordova platform add browser
cordova platform add android
  esta tarda unos minutos (~4) en bajarse dependencias y configurarse

Quitar plataforma
cordova platform rm browser


# Compilar
No hace falta para browser

Para todo
cordova build

cordova build android

En platforms/android tendremos creado un proyecto de android que podremos editar en Android Studio



# Ejecutar la app
cordova run browser

Cambiar el navegador que abre la app:
platforms/browser/cordova/node_modules/cordova-serve/src/browser.js


cordova run android
  tendremos que tener conectado un movil por adb, o un emulador configurado

Con emulador
cordova emulate android
