http://developer.android.com/tools/publishing/app-signing.html

Crear claves:
keytool -genkey -v -keystore my-release-key.keystore -alias NOMBRE -keyalg RSA -keysize 2048 -validity 10000
  nos preguntará info para crear la clave
  creará el fichero my-release-key.keystore

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore APLICACION.apk NOMBRE


zipalign ensures that all uncompressed data starts with a particular byte alignment relative to the start of the file, which reduces the amount of RAM consumed by an app.
http://developer.android.com/tools/help/zipalign.html
zipalign -v 4 your_project_name-unaligned.apk your_project_name.apk
