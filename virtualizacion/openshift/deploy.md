Cuando se va a desplegar un container primero se crea un container /pod (que se mantendrá).

Luego se levanta un container con la imagen openshift/origin-deployer:v1.5.0 que esperará (10m) a que aparezca el container con la aplicación.
Si el container de la app no se levanta, el deployer mostrará un mensaje de error.
