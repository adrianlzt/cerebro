Arrancar una máquina virtual: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#EC2_LaunchInstance_Linux
Arrancar una PaaS: http://docs.aws.amazon.com/gettingstarted/latest/awsgsg-freetier/deploy-sample-app.html


https://console.aws.amazon.com
EC2 -> Launch Instance -> Quick Launch:
Definimos el nombre de la máquina, y un nombre para el fichero de clave que nos bajará (para conectarnos con nuestra máquina).
La arrancamos.
En la consola esperamos hasta que este activa.
Seleccionandola obtendremos su dns público.

ssh -i archivo.pem nombre.dns.publico
