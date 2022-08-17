git clone https://github.com/metal3-io/baremetal-operator.git

cd baremetal-operator
git co v0.1.0

Modificar ironic-deployment/default/ironic_bmo_configmap.env
Posiblemente modificar PROVISIONING_INTERFACE=

kubectl create ns baremetal-operator-system
Dry-run, para ver que va a crear:
IRONIC_HOST_IP=10.0.20.99 KUBECTL_ARGS="--dry-run=server" bash tools/deploy.sh -b -i -n

Desplegar:
IRONIC_HOST_IP=10.0.20.99 tools/deploy.sh -b -i -n

Recursos que crea:
namespace/baremetal-operator-system

customresourcedefinition.apiextensions.k8s.io/baremetalhosts.metal3.io 
customresourcedefinition.apiextensions.k8s.io/bmceventsubscriptions.metal3.io 
customresourcedefinition.apiextensions.k8s.io/firmwareschemas.metal3.io 
customresourcedefinition.apiextensions.k8s.io/hardwaredata.metal3.io 
customresourcedefinition.apiextensions.k8s.io/hostfirmwaresettings.metal3.io 
customresourcedefinition.apiextensions.k8s.io/preprovisioningimages.metal3.io 

serviceaccount/baremetal-operator-controller-manager 
role.rbac.authorization.k8s.io/baremetal-operator-leader-election-role 
clusterrolebinding.rbac.authorization.k8s.io/baremetal-operator-manager-rolebinding 
clusterrolebinding.rbac.authorization.k8s.io/baremetal-operator-proxy-rolebinding 
rolebinding.rbac.authorization.k8s.io/baremetal-operator-leader-election-rolebinding 
clusterrole.rbac.authorization.k8s.io/baremetal-operator-manager-role 
clusterrole.rbac.authorization.k8s.io/baremetal-operator-metrics-reader 
clusterrole.rbac.authorization.k8s.io/baremetal-operator-proxy-role 

certificate.cert-manager.io/baremetal-operator-serving-cert 
issuer.cert-manager.io/baremetal-operator-selfsigned-issuer 
validatingwebhookconfiguration.admissionregistration.k8s.io/baremetal-operator-validating-webhook-configuration 

secret/baremetal-operator-mariadb-password-ftkgc8tmkc 

configmap/baremetal-operator-ironic 
configmap/baremetal-operator-manager-config 
configmap/baremetal-operator-ironic-bmo-configmap-kd6855f44h 

service/baremetal-operator-controller-manager-metrics-service 
service/baremetal-operator-webhook-service 

deployment.apps/baremetal-operator-controller-manager 
deployment.apps/baremetal-operator-ironic 


Levanta un poc con el controller del operator y otro con ironic.
Ironic es un pod con los contenedores:
 - dnsmasq (provee dhcp, tftp, etc)
 - mariadb
 - ironic
 - ironic-log-watch (recibe los logs cuando tenemos el agente IPA, ironic-python-agent, arrancado en los hosts)
 - ironic-inspector (ejecuta los comandos ipmitool...)
 - ironic-httpd (sirve las imágenes)

Tiene un pod tipo init (imagen quay.io/metal3-io/ironic-ipa-downloader) que se baja:
https://images.rdoproject.org/centos9/master/rdo_trunk/current-tripleo/ironic-python-agent.tar
Contiene:
- ironic-python-agent.initramfs (fichero gzip + cpio con el contenido de la imagen centos stream release 9, a fecha agosto 2022)
- ironic-python-agent.kernel
Copia esas imágenes al volumen compartido.

Para ver extraer el contenido del initramfs: cat ironic-python-agent.initramfs | gunzip| cpio -idv

Esas imágenes las sirve ironic-httpd desde ese volumen compartido (/shared/html/images)

Si queremos hacer una imagen custom: https://docs.openstack.org/ironic-python-agent/latest/install/index.html#image-builders
Aquí hay imágenes IPA para centos7/8/9: https://tarballs.opendev.org/openstack/ironic-python-agent/dib/files/
Parece que tenemos que meter en un tar la imagen initramfs y kernel.
Subiremos esa imagen al ironic-httpd:/shared/html/images

Si queremos hacer una imagen custom: pip install ironic-python-agent-builder

La imagen tiene el rescue mode, por lo que lo podemos usar para cambiar la pass de root.
O construir una imagen a la que se le pueda pasar una clave ssh o crear un usuario: https://docs.openstack.org/ironic-python-agent-builder/latest/admin/dib.html

Construir una imagen con un user para acceder por ssh (con clave ssh y key):
``````
export DIB_DEV_USER_USERNAME=nombreuser
export DIB_DEV_USER_PWDLESS_SUDO=yes
export DIB_DEV_USER_AUTHORIZED_KEYS=ssh-key-ipa.pub
export DIB_DEV_USER_PASSWORD=mipassword
export DIB_REPOREF_ironic_python_agent=origin/stable/yoga
export DIB_REPOREF_requirements=origin/stable/yoga
ironic-python-agent-builder --elements-path=elements --element=devuser -o debian-ipa --release bullseye debian
#ironic-python-agent-builder --elements-path=elements -o centos7-ipa --release 7 centos
#ironic-python-agent-builder --elements-path=elements --element=devuser --element=foobar -o centos8-ipa --release 8-stream centos
``````

El "element" foobar es un directorio en elements/ donde podemos cargar un script para ejecutar lo que queramos.

El acceso externo es útil si el provisioner no funciona.

Parece que el element externo que le meto, aunque veo el binario instalado, luego no lo veo en la imagen cargada. Raro




Parece que quien usa las variables de entorno donde se define la imagen de initramfs y kernel es el operator (controller):
https://github.com/metal3-io/baremetal-operator/blob/05d12b6768a9989a9a4e61dad6cd1f9e84a6e078/pkg/provisioner/ironic/factory.go#L64
Las carga del configmap baremetal-operator-ironic
baremetal-operator-ironic

Modificaremos las variables:
DEPLOY_KERNEL_URL: http://ironic-httpd.baremetal-operator-system:6180/images/ironic-python-agent-centos7/ironic-python-agent.kernel
DEPLOY_RAMDISK_URL: http://ironic-httpd.baremetal-operator-system:6180/images/ironic-python-agent-centos7/ironic-python-agent.initramfs
Y reiniciaremos el operator (controller).
Creo que me estuvo funcionando, pero luego de algunos cambios dejo de funciónar. Opté por quitar el enlace simbólico original para apuntar a las creadas por mi.
Tal vez por no definir la bootMACAddress.
Otra ejecución me ha funcionado sin definir el bootMACAddress.

Esas variables también se definen en el CM que usa ironic, pero no se si se usan en algún lado. Por ahora solo modificando en el controller.


Cuando arranca la imagen IPA expone un endpoint https en el puerto :9999 donde se puede consultar su estado.
Parece que no levanta el puerto hasta que ha terminado de escanear todo (necesita "pip install hardware")
Ejemplo:
```
# curl -sk https://localhost:9999/status | python3 -m json.tool
{
    "started_at": 1660573317.415543,
    "version": "8.5.1.dev9"
}```


Si queremos ver si ha habido problemas:
journalctl -n 1000 -u ironic-python-agent.service | grep -v -e DEBUG -e heartbe

El pod de ironic está levantado con hostNetwork=true

Hay con volumen ironic-data-volume tipo emptyDir. Tal vez tenga que ser un PVC si queremos mantener los datos?

Editar cm del inspector y meter (metidas mejor en config/default/ironic.env y ironic-deployment/default/ironic_bmo_configmap.env)
PROVISIONING_IP: ""
IRONIC_IP: ""

El script espera que esté definida la variable (aunque sea vacía).


{"level":"info","ts":1660041450.4141388,"logger":"provisioner.ironic","msg":"error caught while checking endpoint","host":"baremetal-operator-system~colo02ap",
"endpoint":"http://172.22.0.2:6385/v1/","error":"Get \"http://172.22.0.2:6385/v1\": dial tcp 172.22.0.2:6385: i/o timeout"}

Hace falta crear Services y modificar el config map para que apunte a los services, en vez de a las IPs a fuego.
Se puede modificar en config/default/ironic.env y ironic-deployment/default/ironic_bmo_configmap.env para luego reejecutar el deploy




{"level":"info","ts":1660057518.6517978,"logger":"provisioner.ironic","msg":"current provision state","host":"baremetal-operator-system~colo02ap","lastError":"Failed to inspect hardware. Reason: unable to start inspection: Validation of image href http://ironic-httpd:6180/images/ironic-python-agent.kernel failed, reason: HTTPConnectionPool(host='ironic-httpd', port=6180): Max retries exceeded with url: /images/ironic-python-agent.kernel (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x7f0142250b80>: Failed to establish a new connection: [Errno -2] Name or service not known'))","current":"inspect failed","target":"manageable"}

{"level":"info","ts":1660057518.6907141,"logger":"controllers.BareMetalHost","msg":"publishing event","baremetalhost":"baremetal-operator-system/colo02ap","reason":"InspectionError","message":"Failed to inspect hardware. Reason: unable to start inspection: Validation of image href http://ironic-httpd:6180/images/ironic-python-agent.kernel failed, reason: HTTPConnectionPool(host='ironic-httpd', port=6180): Max retries exceeded with url: /images/ironic-python-agent.kernel (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x7f0142250b80>: Failed to establish a new connection: [Errno -2] Name or service not known'))"}

Hace falta poner el svc con el NS, porque lo va a resolver las DNS del host donde corre ironic (no el namespace de red de un pod)


Forzarlo a un nodo, o a un grupo de nodos que tengan el mismo nombre de interfaz, para que no de problemas con eso.



Preparar un nodo.
Debemos crear un BareMetalHost con la dirección de su BMO y credenciales. Ejemplo con IPMI:
```
apiVersion: metal3.io/v1alpha1
kind: BareMetalHost
metadata:
  name: nombreNodo
spec:
  online: true
  bootMACAddress: 00:35:30:2a:ad:48 # la MAC de la interfaz que arranca PXE
  bmc:
    address: ipmi://10.0.1.2:623
    credentialsName: ipmi-secret
```

Parece que cada BareMetalHost tiene que tener su propio secret/ipmi-secret. O tal vez fue porque le pillo borrando el otro BareMetalHost?

El operador encontrará el CRD y empezará a escanerlo (status=inspecting) con el ironic-inspector (me tardó 10min en un nodo).
Cuando termine el state del nodo estará en available y en el status tendremos información del nodo (de su hardware).
Ejemplo en https://metal3.io/try-it.html (buscar "kubectl get baremetalhost -n metal3 -o yaml node-0")
Podemos ver en la consola de la BMC como carga el IPA usando network boot.

Podemos ver los logs del logwatch para ver cuando el IPA envía la info:
kc logs --tail 40 deployments/baremetal-operator-ironic -c ironic-log-watch


Para provisionar una máquina creaermos un CRD Metal3Machine.
Me recuerda al esquema PV/PVC, donde los PVs serían los BareMetalHost y los PVC los Metal3Machine.

No tengo claro si hace falta el Metal3Machine o si se puede poner la imagen directamente en el BareMetalHost.
El host en modo available había arrancado un centos9, pero no había nada de status. Sería la imagen del ironic-python-agent?

Parece que con pasar la imagen en el BareMetalHost es suficiente, pero tenemos que especificar el disco. De donde sacar esa info?
Creo que debería estar en el status, pero si la imagen de ironic-python-agent no soporta la controladora, no lo veremos.



In Metal3, the image deployment is performed by the Ironic Python Agent (IPA) image running on the target host. In order to deploy an image, Ironic will first boot the target node with an IPA image over iPXE. IPA will run in memory.

Once IPA runs on the target node, Ironic will instruct it to download the target image. In Metal3, we use HTTP(S) for the download of the image. IPA will download the image and, depending on the format of the image, prepare it to write it on the disk.




Problemas, el IPA desplegado coge un DNS que no existe. Apuntar a algún sitio del que pueda bajar la imagen.



Problema con versión vieja de qemu
Aug 17 15:26:05 localhost.localdomain ironic-python-agent[1340]: 2022-08-17 15:26:05.782 1340 ERROR root Stdout: "qemu-img version 1.5.3, Copyright (c) 2004-2008 Fabrice Bellard\nusage: qemu-img command [command
options]\nQEMU disk image utility\n\nCommand syntax:\n  check [-q] [-f fmt] [--output=ofmt] [-r [leaks | all]] [-T src_cache] filename\n  create [-q] [-f fmt] [-o options] filename [size]\n  commit [-q] [-f fmt]
[-t cache] filename\n  compare [-f fmt] [-F fmt] [-T src_cache] [-p] [-q] [-s] filename1 filename2\n  convert [-c] [-p] [-q] [-n] [-f fmt] [-t cache] [-T src_cache] [-O output_fmt] [-o options] [-s snapshot_name]
 [-S sparse_size] filename [filename2 [...]] output_filename\n  info [-f fmt] [--output=ofmt] [--backing-chain] filename\n  map [-f fmt] [--output=ofmt] filename\n  snapshot [-q] [-l | -a snapshot | -c snapshot |
 -d snapshot] filename\n  rebase [-q] [-f fmt] [-t cache] [-T src_cache] [-p] [-u] -b backing_file [-F backing_fmt] filename\n  resize [-q] filename [+ | -]size\n  amend [-q] [-f fmt] [-t cache] -o options filena
me\n\nCommand parameters:\n  'filename' is a disk image filename\n  'fmt' is the disk image format. It is guessed automatically in most cases\n  'cache' is the cache mode used to write the output disk image, the
valid\n    options are: 'none', 'writeback' (default, except for convert), 'writethrough',\n    'directsync' and 'unsafe' (default for convert)\n  'src_cache' is the cache mode used to read input disk images, the
 valid\n    options are the same as for the 'cache' option\n  'size' is the disk image size in bytes. Optional suffixes\n    'k' or 'K' (kilobyte, 1024), 'M' (megabyte, 1024k), 'G' (gigabyte, 1024M),\n    'T' (te
rabyte, 1024G), 'P' (petabyte, 1024T) and 'E' (exabyte, 1024P)  are\n    supported. 'b' is ignored.\n  'output_filename' is the destination disk image filename\n  'output_fmt' is the destination format\n  'option
s' is a comma separated list of format specific options in a\n    name=value format. Use -o ? for an overview of the options supported by the\n    used format\n  '-c' indicates that target image must be compresse
d (qcow format only)\n  '-u' enables unsafe rebasing. It is assumed that old and new backing file\n       match exactly. The image doesn't need a working backing file before\n       rebasing in this case (useful
for renaming the backing file)\n  '-h' with or without a command shows this help and lists the supported formats\n  '-p' show progress of command (only certain commands)\n  '-q' use Quiet mode - do not print any
output (except errors)\n  '-S' indicates the consecutive number of bytes (defaults to 4k) that must\n       contain only zeros for qemu-img to create a sparse image during\n       conversion. If the number of byt
es is 0, the source will not be scanned for\n       unallocated or zero sectors, and the destination image will always be\n       fully allocated\n  '--output' takes the format in which the output must be done (h
uman or json)\n  '-n' skips the target volume creation (useful if the volume is created\n       prior to running qemu-img)\n\nParameters to check subcommand:\n  '-r' tries to repair any inconsistencies that are f
ound during the check.\n       '-r leaks' repairs only cluster leaks, whereas '-r all' fixes all\n       kinds of errors, with a higher risk of choosing the wrong fix or\n       hiding corruption that has already
 occurred.\n\nParameters to snapshot subcommand:\n  'snapshot' is the name of the snapshot to create, apply or delete\n  '-a' applies a snapshot (revert disk to saved state)\n  '-c' creates a snapshot\n  '-d' del
etes a snapshot\n  '-l' lists all snapshots in the given image\n\nParameters to compare subcommand:\n  '-f' first image format\n  '-F' second image format\n  '-s' run in Strict mode - fail on different image size
 or sector allocation\n\nSupported formats: vvfat vpc vmdk vhdx vdi ssh sheepdog rbd raw host_cdrom host_floppy host_device file qed qcow2 qcow parallels nbd iscsi gluster dmg tftp ftps ftp https http cloop bochs
 blkverify blkdebug\n"
Aug 17 15:26:05 localhost.localdomain ironic-python-agent[1340]: 2022-08-17 15:26:05.782 1340 ERROR root Stderr: "convert: invalid option -- 'W'\n"




Dos tipos de imágenes, la que se levanta con el IPA y la que se instala.
https://docs.openstack.org/ironic/latest/user/creating-images.html
