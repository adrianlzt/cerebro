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

El acceos externo es útil si el provisioner no funciona.




Parece que quien usa las variables de entorno donde se define la imagen de initramfs y kernel es el operator (controller):
https://github.com/metal3-io/baremetal-operator/blob/05d12b6768a9989a9a4e61dad6cd1f9e84a6e078/pkg/provisioner/ironic/factory.go#L64
Las carga del configmap baremetal-operator-ironic
baremetal-operator-ironic

Modificaremos las variables:
DEPLOY_KERNEL_URL: http://ironic-httpd.baremetal-operator-system:6180/images/ironic-python-agent-centos7/ironic-python-agent.kernel
DEPLOY_RAMDISK_URL: http://ironic-httpd.baremetal-operator-system:6180/images/ironic-python-agent-centos7/ironic-python-agent.initramfs
Y reiniciaremos el operator (controller).
Creo que me estuvo funcionando, pero luego de algunos cambios dejo de funciónar. Opté por quitar el enlace simbólico original para apuntar a las creadas por mi.

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
  bootMACAddress: 00:35:30:2a:ad:48 # la MAC de la interfaz que arranca PXE, creo que no obligatorio, al menos para IPMI
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
