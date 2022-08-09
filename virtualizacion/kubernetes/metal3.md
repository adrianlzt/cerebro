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
namespace/baremetal-operator-system configured
customresourcedefinition.apiextensions.k8s.io/baremetalhosts.metal3.io 
customresourcedefinition.apiextensions.k8s.io/bmceventsubscriptions.metal3.io 
customresourcedefinition.apiextensions.k8s.io/firmwareschemas.metal3.io 
customresourcedefinition.apiextensions.k8s.io/hardwaredata.metal3.io 
customresourcedefinition.apiextensions.k8s.io/hostfirmwaresettings.metal3.io 
customresourcedefinition.apiextensions.k8s.io/preprovisioningimages.metal3.io 
serviceaccount/baremetal-operator-controller-manager 
role.rbac.authorization.k8s.io/baremetal-operator-leader-election-role 
clusterrole.rbac.authorization.k8s.io/baremetal-operator-manager-role 
clusterrole.rbac.authorization.k8s.io/baremetal-operator-metrics-reader 
clusterrole.rbac.authorization.k8s.io/baremetal-operator-proxy-role 
rolebinding.rbac.authorization.k8s.io/baremetal-operator-leader-election-rolebinding 
clusterrolebinding.rbac.authorization.k8s.io/baremetal-operator-manager-rolebinding 
clusterrolebinding.rbac.authorization.k8s.io/baremetal-operator-proxy-rolebinding 
configmap/baremetal-operator-ironic 
configmap/baremetal-operator-manager-config 
service/baremetal-operator-controller-manager-metrics-service 
service/baremetal-operator-webhook-service 
deployment.apps/baremetal-operator-controller-manager 
certificate.cert-manager.io/baremetal-operator-serving-cert 
issuer.cert-manager.io/baremetal-operator-selfsigned-issuer 
validatingwebhookconfiguration.admissionregistration.k8s.io/baremetal-operator-validating-webhook-configuration 
configmap/baremetal-operator-ironic-bmo-configmap-kd6855f44h 
secret/baremetal-operator-mariadb-password-ftkgc8tmkc 
deployment.apps/baremetal-operator-ironic 


Levanta un poc con el controller del operator y otro con ironic.
Ironic es un pod con los contenedores:
 - dnsmasq
 - mariadb
 - ironic
 - ironic-log-watch
 - ironic-inspector
 - ironic-httpd

Tiene un pod tipo init que se baja:
https://images.rdoproject.org/centos9/master/rdo_trunk/current-tripleo//ironic-python-agent.tar

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
