https://docs.openshift.com/container-platform/3.5/architecture/index.html#architecture-index

# Unidades
Masters (https://docs.openshift.com/container-platform/3.5/architecture/infrastructure_components/kubernetes_infrastructure.html#master):
 - API/auth
 - Controller Manager Server: se subscribe a cambios en etcd y usa las APIs para aplicar esos cambios
   Gestiona los componentes con estado de la plataforma. Ejemplo: asignar pod a un nodo, vigilar que las replicas sean las deseadas, hacer binding entre volume claims y volumes.
 - Data store
 - Scheduler
 - Management/replication
 - etcd (almacen de objetos)
 - haproxy (opcional, cuando se tiene HA con modo nativo)
 - web interfaz (servida por el binario openshift)

Nodes (https://docs.openshift.com/container-platform/3.5/architecture/infrastructure_components/kubernetes_infrastructure.html#node):
 - docker
 - kubelet (crea los containers según manifest escrito en YAML)
 - service proxy (reflects the services defined in the API on that node). Para que sirve?
 - gestionar la SDN
 - gestiona openvswitch, iptables
 - reinicia los containers que fallen

Peristent storage

Routing layer


# Lógica
Los usuarios atacan a las REST APIs
Los controllers leen esas APIs y modifican el cluster para adecuarse a lo solicitado

La idea es que los controllers leen el estado de etcd y modifican el entorno para ajustarse a ese estado.
Si un componente falla y es reiniciado, volverá a comprobar que el estado de etcd es el que existe en realidad.


# HA / high availability / alta disponibilidad
Los servicios en los master siguen la configuración:
etcd active-active
api server active-active
controller manager server active-pasive
haproxy active-passive


# Openshift-infra
El proyecto "openshift-infra" es donde están casi todos los servicios que mantienen la plataforma.
NO se debe tocar en este proyecto.
