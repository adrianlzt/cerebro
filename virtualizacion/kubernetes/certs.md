https://kubernetes.io/docs/setup/best-practices/certificates/

https://kubernetes.io/docs/tasks/tls/certificate-rotation/#:~:text=Kubernetes%201.8%20contains%20kubelet%20certificate,the%20current%20certificate%20approaches%20expiration.
https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/
  para gestionar certs con kubeadm

El kubelet y el apiserver usan certs almacenados en /etc/kubernetes/ssl/
En ese mismo dir está la CA (ca.crt).

El kubelet, cuando se acerca la fecha de expiración (por defecto, 1 año), renueva automáticamente el certificado.

Si queremos añadir más dominios al certificado:
https://blog.scottlowe.org/2019/07/30/adding-a-name-to-kubernetes-api-server-certificate/

Para renovar los certificados del apiserver, añadiendo más dominios:
kubeadm init phase certs apiserver --apiserver-cert-extra-sans kubernetes,kubernetes.default,kubernetes.default.svc


# Errores
Me falló la renovación automática (v1.14) no se porqué.

Regeneré los certs caducados con:
kubeadm alpha certs renew apiserver
kubeadm alpha certs renew apiserver-kubelet-client
kubeadm alpha certs renew front-proxy-client

Restart el container de apiserver


También tuve que modificar la config del kubelet por esto:
On nodes created with kubeadm init, prior to kubeadm version 1.17, there is a bug (https://github.com/kubernetes/kubeadm/issues/1753)

update kubelet.conf, replacing client-certificate-data and client-key-data with:
  client-certificate: /var/lib/kubelet/pki/kubelet-client-current.pem
  client-key: /var/lib/kubelet/pki/kubelet-client-current.pem


Modificar estos certs provoca que los usuarios se queden con certs invalidados?
Parece que perdi el cert de admin pero no el de los users


# Auth
si usamos certs para autorizar acceso, la ca y key usadas las podemos ver en los parámetros del kube-controller-manager
--cluster-signing-cert-file=/etc/kubernetes/ssl/ca.crt --cluster-signing-key-file=/etc/kubernetes/ssl/ca.key


# Regenerar certs caducados
v1.14
https://stackoverflow.com/questions/56320930/renew-kubernetes-pki-after-expired/56334732#56334732

La IP de advertise la podemos sacar con:
grep adverti /etc/kubernetes/kubeadm-config.yaml
