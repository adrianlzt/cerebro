# Pod (algo parecido a las tasks en docker swarm)
https://kubernetes.io/docs/concepts/workloads/pods/pod/

Varios containers corriendo en el mismo namespace de network, ipc, uts y cgroup. Ambos tendrán la misma ip, se podrán comunicar via localhost:puerto.
Tendran el mismo hostname

A pod is a group of one or more containers, the shared storage for those containers, and options about how to run the containers
Kubernetes deploys and schedules containers in groups called pods. A pod will typically include 1 to 5 containers that collaborate to provide a service.

Pueden ser varios containers corriendo como uno solo, pero en la realidad parace que suele ser pod == container

Razón de poder tener varios containers como un solo pod:
The primary reason that Pods can have multiple containers is to support helper applications that assist a primary application. Typical examples of helper applications are data pullers, data pushers, and proxies. Helper and primary applications often need to communicate with each other. Typically this is done through a shared filesystem, as shown in this exercise, or through the loopback network interface, localhost. An example of this pattern is a web server along with a helper program that polls a Git repository for new updates.
The Volume in this exercise provides a way for Containers to communicate during the life of the Pod. If the Pod is deleted and recreated, any data stored in the shared Volume is lost.

Kubernetes ensures that pods are able to network with each other, and allocates each pod an IP address from an internal network. This ensures all containers within the pod behave as if they were on the same host. Giving each pod its own IP address means that pods can be treated like physical hosts or virtual machines in terms of port allocation, networking, naming, service discovery, load balancing, application configuration, and migration.


Ejemplo:
Openshift para dar el servicio Kibana crea un pod con dos containers.
Un container es el que recibe las peticiones y las autentica contra openshift (reverse-proxy https://github.com/fabric8io/openshift-auth-proxy)
El otro es el kibana en si mismo.


# init containers
https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
Podemos poner en un pod unos "init containers" que se ejecutarán antes que los containers "normales" de pod.


# SCC
Todo pod se levanta con un system account determinada, por defecto la sa/default que aparece al crear el proyecto.


# Levantar un pod
oc run ...
oc run prueba --image=busybox
