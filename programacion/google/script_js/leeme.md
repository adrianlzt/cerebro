https://www.google.com/script/start/

Hacer apps web en JS con las APIs de Google.


# Time-driven triggers / Cron jobs
https://developers.google.com/apps-script/guides/triggers/installable



https://developers.googleblog.com/2015/12/advanced-development-process-with-apps.html
ideas para desarrollar mejor

https://github.com/danthareja/node-google-apps-script
modulo npm para desarrollar en local y luego ir subiendo los cambios con un comando
Seguir unos pasos para autenticarnos.

Una vez autenticados, para empezar un proyecto, crear un google script, copiar el ID  (entre "/d/" y "/edit")
mkdir nuestrodir
cd nuestrodir
gapps init ID

Crear nuestros ficheros .gs, .js o .html en el directorio src/

Subir los ficheros (desde el dir raiz, NO desde src/)
gapps upload

Recargar la web para ver los cambios

Parece que aunque tengamos ficheros .js el los subre como .gs, con las limitaciones que ello implica (no es javascrip real)
