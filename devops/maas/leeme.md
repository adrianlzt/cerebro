http://maas.ubuntu.com

Metal As A Service

Tratar máquinas físicas como si fuesen máquinas virtuales.
Cuando se necesita una máquina, se levanta por WOL (o similar) y se provisiona.


Guia de Dell para desplegar sobre MAAS+Juju
http://linux.dell.com/files/whitepapers/Deploying_Workloads_With_Juju_And_MAAS.pdf

Las máquinas se agrupan en cluster. Cada cluster tiene un controlador (dhcp+tftp).
A Cluster controller is in charge of provisioning and consists of a TFTP server and an optional DHCP server. It is also responsible for powering servers on and off.

Una máquina (controlador regional) es el super controlador sobre todos los clusters. Este deberá estar en HA y tiene la interfaz web y API.
A Region controller consists of a web user interface, an API, the metadata server for cloud-init and an optional DNS server.
