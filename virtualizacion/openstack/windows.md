Imagenes windows para openstack:
https://cloudbase.it/windows-cloud-images/

Una vez levantada la instancia obtendremos la pass del usuario "Admin" para acceder por RDP con el comando:
nova get-password <instance> <SSH_private_key>
Esto no me funciona


Otra forma es entrar por la consola de openstack



Una vez dentro, en el "Server Manager", seleccionar el "Local Server" y quitar el "IE Enchanced Secutiry Configurations"


Para conectar desde linux usar Remmina.
En la conf podemos compartir un directorio que aparecerá como otra unidad.
