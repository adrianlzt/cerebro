https://docs.openshift.com/container-platform/3.5/install_config/install/planning.html

Podemos instalar con un script interactivo o usando los playbooks de ansible. https://docs.openshift.com/container-platform/3.5/install_config/install/quick_install.html#install-config-install-quick-install

Tambien podemos instalar de forma interactiva y luego modificar con ansible. https://docs.openshift.com/container-platform/3.5/install_config/install/advanced_install.html#install-config-install-advanced-install

Si montamos HA para los master deberemos elegir una VIP accesible por el resto de nodos del cluster.



# Quick install
Lanzamos desde la máquina que hayamos configurado como "bastion"

Lanzar la instalación
atomic-openshift-installer install

Si montamos varios master (mínimo 3) para tener HA nos pedirá una máquina para usar como balanceador. Nos pedirá si queremos que instale HAproxy en ella.
Nos pedirá donde meter el registry storage. En la máquina que le indiquemos montará un NFS.
  Tocara el fichero /etc/sysconfig/nfs (tambien el de iptables para permitir el trafico)
  Los exports los habrá definido en: /etc/exports.d/openshift-ansible.exports (user nfsnobody:nfsnobody, 65534:65534). Directorios vacios

Antes de comenzar la instalación nos dirá que ha generado dos ficheros.
Un inventario de ansible: ~/.config/openshift/hosts (ver si tenemos que modificar algo respecto a los hostnames)
Un fichero de conf: ~/.config/openshift/installer.cfg.yml (ver si tenemos que modificar algo respecto a los hostnames)


Tras finalizar la instalación entraremos en alguno de los master y ejecutaremos:
oc get nodes
  deberán estar en estado "Ready"

Probar entrar en el master. Si tenemos varios master con HA tendremos que apuntar al balanceador (haproxy)
El balanceador simplemente hace un round-robin sobre las ips de los master puerto 8443

Tendremos que entrar usando el dominio publico de la máquina (si intentamos usar la ip luego habrá una redirección al dominio).
El puerto será 8443, con https.

Nos pide que ejecutemos este comando en todos los nodos:
atomic-openshift-excluder exclude
Lo que hace es meter la siguiente lista en la lista de repos excluidos de yum:
atomic-openshift atomic-openshift-clients atomic-openshift-clients-redistributable atomic-openshift-dockerregistry atomic-openshift-master atomic-openshift-node atomic-openshift-pod atomic-openshift-recycle atomic-openshift-sdn-ovs atomic-openshift-tests tuned-profiles-atomic-openshift-node
Yo ya veo esa lista excluída. Tal vez sea para las instalaciones sobre atomic? (yo he instalado sobre rhel)


Comprobar logs de los servicios:
master:
  journalctl -u atomic-openshift-master-api.service
  journalctl -u atomic-openshift-master-controllers.service
  journalctl -u atomic-openshift-node.service
nodes:
  journalctl -u atomic-openshift-node.service



# Authentication
https://docs.openshift.com/container-platform/3.5/install_config/configuring_authentication.html#install-config-configuring-authentication

Por defecto nadie tiene permitido acceder a la plataforma.



# Registry
https://docs.openshift.com/container-platform/3.5/install_config/registry/index.html#install-config-registry-overview

El registry esta desplegado sobre kubernetes:
oc describe dc/docker-registry
Comprobar que esta funcionando:
oc status -v
Los nodes necesitan acceso a internet para bajar imágenes del router y del registry


# Router
https://docs.openshift.com/container-platform/3.5/install_config/router/default_haproxy_router.html

La instalación ha creado el service para el router
Comprobar que está funcionando:
oc status -v
Los nodes necesitan acceso a internet para bajar imágenes del router y del registry

Parece que para los routers lo suyo es desplegar dos nodos como "nodes", ponerles algún tipo de label y desplegar sobre ellos los routers.

