# Uso de los certificados dentro de kubernetes
https://kubernetes.io/docs/setup/best-practices/certificates/
https://github.com/kelseyhightower/kubernetes-the-hard-way/blob/master/docs/04-certificate-authority.md

Client certificates for the kubelet to authenticate to the API server <- estos creo que son los que se renuevan solos. Estan tanto en los masters como los workers
Server certificate for the API server endpoint <- el endpoint web https que exponen los masters
Client certificates for administrators of the cluster to authenticate to the API server
Client certificates for the API server to talk to the kubelets
Client certificate for the API server to talk to etcd
Client certificate/kubeconfig for the controller manager to talk to the API server
Client certificate/kubeconfig for the scheduler to talk to the API server.
Client and server certificates for the front-proxy (only if you run kube-proxy to support an extension API server)

Los certs, si instalamos con kubeadm o ansible, están en /etc/kubernetes/ssl

## ETCd
Autoridad certificadora:
/etc/kubernetes/ssl/etcd/ca.crt,key

Firma: apiserver-etcd-client, etc-dserver, etcd-peer y etcd-healthcheck-client


## Kubernetes
Autoridad certificadora:
/etc/kubernetes/ssl/ca.crt,key

Para las service account también tenemos la pareja clave pública/privada sa.key,pub

Firma: apiserver, apiserver-kubelet-client y front-proxy

Cada nodo tiene un kubelet que debe tener su propio cert de cliente ante la API.
Estos certs les autorizarán como pertenecientes al grupo system:nodes con el usuario system:node:NOMBRE

Comprobar a mano caducidad certs
find /etc/kubernetes/pki/ -type f -name "*.crt" -print | egrep -v 'ca.crt$' | xargs -L 1 -t  -i bash -c 'openssl x509  -noout -text -in {}|grep After'

### Regenerar certs master
https://stackoverflow.com/a/57308826

kubeadm init phase certs all --config /etc/kubernetes/kubeadm-config.yaml

Si no tenemos fichero de kubeadm tendremos que pasar los distintos parámetros.



### Kubelets
https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet-tls-bootstrapping/
Es la comunicación de los nodos que forman kubernetes con el apiserver, usando TLS tanto en cliente como en servidor.

Usa un fichero similar al que usamos en .kube/config para usar kubectl.
Solo que los certificados apuntan a unos ficheros que se van rotando para renovar los certs automáticamente.


Si ha caducado el cert de un kubelet, podemos regenerarlo siguiendo estos pasos:
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/troubleshooting-kubeadm/#kubelet-client-cert


## Service accounts
Debemos crear 4 service accounts (que son en realidad certificados) para:
admin (administrador del cluster)
kubelet (tenemos uno de estos en cada nodo del cluster)
controller-manager
scheduler







https://kubernetes.io/docs/tasks/tls/certificate-rotation/#:~:text=Kubernetes%201.8%20contains%20kubelet%20certificate,the%20current%20certificate%20approaches%20expiration.
https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/
  para gestionar certs con kubeadm

El kubelet y el apiserver usan certs almacenados en /etc/kubernetes/ssl/
En ese mismo dir está la CA (ca.crt).

El kubelet, cuando se acerca la fecha de expiración (por defecto, 1 año), renueva automáticamente el certificado.

Si queremos añadir más dominios al certificado:
https://blog.scottlowe.org/2019/07/30/adding-a-name-to-kubernetes-api-server-certificate/

Para renovar los certificados del apiserver, añadiendo más dominios:
mv apiserver.crt{,.$(date +%Y%m%d).bkp}
mv apiserver.key{,.$(date +%Y%m%d).bkp}
kubeadm init phase certs apiserver --apiserver-cert-extra-sans kubernetes,kubernetes.default,kubernetes.default.svc
Reiniciar container apiserver


# Errores
Me falló la renovación automática (v1.14) no se porqué.

Regeneré los certs caducados con:
kubeadm alpha certs renew apiserver
kubeadm alpha certs renew apiserver-kubelet-client
kubeadm alpha certs renew front-proxy-client

Los renueva un año, puesto a fuego en el código: https://github.com/kubernetes/kubernetes/blob/80093635c618a62d3ffaa0aabb7b2e2f75393274/cmd/kubeadm/app/constants/constants.go#L48:3
Podemos modificarlo y hacer build de kubeadm con: make WHAT="cmd/kubeadm"

Restart el container de apiserver (k8s_kube-apiserver_kube-apiserver...) y creo que kube-proxy


También tuve que modificar la config del kubelet por esto:
On nodes created with kubeadm init, prior to kubeadm version 1.17, there is a bug (https://github.com/kubernetes/kubeadm/issues/1753)

update kubelet.conf, replacing client-certificate-data and client-key-data with:
  client-certificate: /var/lib/kubelet/pki/kubelet-client-current.pem
  client-key: /var/lib/kubelet/pki/kubelet-client-current.pem


CUIDADO!!
Modificar estos certs provoca que perdamos el acceso de admin y se dejen de comunicar entre si los kubelet y el controlloer-manager

El controller manager sacará errores:
error retrieving resource lock kube-system/kube-controller-manager: Unauthorized

El kube-scheduler:
k8s.io/client-go/informers/factory.go:133: Failed to list *v1.PersistentVolume: Unauthorized

Logs pods asociados a estos servicios los encontramos en el NS kube-system, ejemplo:
kc -n kube-system logs --tail 30 kube-controller-manager-NOMBREHOST


Solución:
https://github.com/kubernetes/kubeadm/issues/581#issuecomment-471575078


Regenerar el fichero /etc/kubernetes/admin.conf
kubeadm alpha kubeconfig user --org system:masters --client-name kubernetes-admin > /etc/kubernetes/admin.conf
Tras esto ya podremos usar ese fichero para atacar al cluster via api
Copiarlo a /root/.kube/config para poder usar kubectl

Regenerar controller-manager.conf
kubeadm alpha kubeconfig user --client-name system:kube-controller-manager > controller-manager.conf
Reiniciar el pod de kube-controller-manager

Regenerar scheduler
kubeadm alpha kubeconfig user --client-name system:kube-scheduler > scheduler.conf
Reiniciar el pod de kube-scheduler

Regenerar kubelet conf
kubeadm alpha kubeconfig user --org system:nodes --client-name system:node:$(hostname) > kubelet.conf
systemctl restart kubelet



# Auth
si usamos certs para autorizar acceso, la ca y key usadas las podemos ver en los parámetros del kube-controller-manager
--cluster-signing-cert-file=/etc/kubernetes/ssl/ca.crt --cluster-signing-key-file=/etc/kubernetes/ssl/ca.key


# Regenerar certs caducados
v1.14
https://stackoverflow.com/questions/56320930/renew-kubernetes-pki-after-expired/56334732#56334732

La IP de advertise la podemos sacar con:
grep adverti /etc/kubernetes/kubeadm-config.yaml
