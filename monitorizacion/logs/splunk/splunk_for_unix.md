http://apps.splunk.com/app/273/
http://docs.splunk.com/Documentation/UnixApp/5.0.2TA/User/Whatdataarecollected
http://docs.splunk.com/Documentation/UnixApp/latest/User/AbouttheSplunkAppforUnix

El splunk app se mete en la instancia splunk.
El splunk add on se instala en las máquinas a monitorizar, junto con el forwarder.
When installed on a universal forwarder, the add-on must be configured manually via the command line.

The Splunk App for Unix and Linux installs directly onto a Splunk search head or indexer. It can be configured either through the app's setup user interface in Splunk Web or manually via the command line.

The Splunk Add-on for Unix and Linux requires the sysstat package to function properly.

You can use the add-on to collect *nix data from a number of *nix machines by installing a universal forwarder on each machine and deploying the app to those forwarders. Once the app is installed on each forwarder, you can then forward the data to a receiving indexer that is running the full app

## App ##
Typical Installation Instructions
  Log into Splunk
  Select Manage apps... from the App menu
  Click Install app from file button.
  On the Upload a file screen and Browse...
  Locate the downloaded [app].tar.gz file, click Open and Upload
->Click Restart Splunk, confirm to restart. <- HACE FALTA REINICIAR SPLUNK. implicaciones?
  After Splunk restarted, login again and start using the app!

Splunk no nos avisará de que ha reiniciado, la web se quedará "colgada" con "waiting...". 
Al recargar la web veremos si ha reiniciado correctamente porque no aparecerán los carteles amarillos arriba avisando de que de hace falta el reinicio.


Otra forma:
1. Log into Splunk on the system on which you want to install the Splunk App for Unix and Linux.  Splunk loads the Home screen.
2. In the "Home" screen, click Find More Apps in the lower left-hand corner of the screen.  Splunk loads the Browse more apps screen.
3. In the "Browse more apps" screen, locate the Splunk App for Unix and Linux in the list, or type in "Splunk App for Unix and Linux" in the search box at the upper right hand corner of the screen.
4. In the "Splunk App for Unix and Linux" entry in the list, click the Install Free button.  Splunk installs the Splunk App for Unix and Linux, as well as the Splunk Add-on and Supporting Add-on for Unix and Linux.
5. Restart Splunk to complete the app installation.
6. Proceed to the "Log in and get started" page to continue using the app.


Desde el command line
1. Download the Splunk app for Unix and Linux from Splunk Apps, if you haven't already.
Note: The file downloads with a .tar.gz extension. Do not attempt to run this file.
2. Unpack the file into an accessible location.
3. Copy the splunk_app_for_nix directory to $SPLUNK_HOME/etc/apps.
4. Restart Splunk to complete the app installation.
5. Proceed to the "Log in and get started" page to continue using the app.

Da error al intentar configurarla: The path '/en-US/custom/splunk_app_for_nix/unixsetup/SA-nix/show' was not found.
[splunk_app_for_nix]# ln -s install/ unixsetup
Sigue sin funcionar. Roto!

Si necesitamos cambiar el índice del que lee los datos la app:
http://docs.splunk.com/Documentation/UnixApp/5.0.2TA/User/First-timeconfiguration -> Change Unix Indexes

Si queremos tener distintas apps con distintos índices, copiaremos varias veces el directorio:
cp -pr /srv/splunk/etc/apps/splunk_app_for_nix /srv/splunk/etc/apps/splunk_app_for_nix2

Y modificaremos el nombre editanto la etiquetal 'label' en /opt/splunk/etc/apps/splunk_app_for_nix2/default/app.conf


## Add on ##

# Instalación
1. Download (http://apps.splunk.com/app/833/) the Splunk Add-on for Unix and Linux from Splunk Apps, if you haven't already.
Note: The file downloads with a .tar.gz extension. Do not attempt to run this file.
2. Unpack the file into an accessible location.
3. Copy the Splunk_TA_nix directory to $SPLUNK_HOME/etc/apps.
4. Restart Splunk to complete the add-on installation.
5. Proceed to the "Log in and get started" page to configure the app.


# Configuración

Script, no entiendo muy bien porque me pide el .tgz. Usar mejor la conf por files.
/opt/splunkforwarder/bin/./splunk cmd /opt/splunkforwarder/etc/apps/Splunk_TA_nix/bin/setup.sh 
  user: admin
  pass: changeme


Configuración del addon sobre el universal forwarder:
/opt/splunkforwarder/etc/apps/Splunk_TA_nix

mkdir /opt/splunkforwarder/etc/apps/Splunk_TA_nix/local
cp /opt/splunkforwarder/etc/apps/Splunk_TA_nix/default/inputs.conf /opt/splunkforwarder/etc/apps/Splunk_TA_nix/local/inputs.conf
  inputs.conf <- datos que se envían al splunk

# Configuración multi índice
The Splunk Add-on for Unix and Linux puts all the data it collects into a special index called os.
Si queremos distinguir entre usuarios, cambiaremos el índice de los inputs de los clientes:
  vi inputs.conf, cambiamos el índice os por nombreindice
  :%s/[ ]os$/ nombreindice/
  :%s/=os$/ nombreindice/
  
  Para comprobar que todo está correcto (índice a donde debe, y activado)
  cat inputs.conf | egrep "index|disabled" | sort | uniq -c

También necesitaremos modificar la app que se instala en los searchers, para que apunten al nuevo índice.


## Distributed environment ##

En el indexer creamos el índice.
En los searches instalamos la app.
Asociamos la app al índice creado.

http://docs.splunk.com/Documentation/UnixApp/latest/User/DeploytheSplunkAppforUnixandLinuxinadistributedSplunkenvironment

If you install the Splunk App for Unix and Linux in a distributed environment and have configured the search heads in that environment to send data to the indexers, you might need to deploy the indexes.conf included with the Splunk Supporting Add-on for Unix and Linux component (SA-nix/default/indexes.conf) onto your indexers to make sure that the unix_summary summary index is available. Failure to do so might cause issues with alerts for the app, as alerts use this special index.


## Consumo ##
He calculado que se consumen unos 150MB de indexación diarios activando todos los plugins que vienen por defecto.
De esos 150MB unos 75MB son del ps.

En busquedas/consumo_indexing.md están las búsquedas para conocer el consumo por host y por sourcetype
