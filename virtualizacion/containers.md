OCI: Open Container Initiative https://www.opencontainers.org/
Organización para estandarizar los formatos de los containers y los runtimes.

Docker es el mayoritario.
Su runtime se llama runC


CoreOS tiene su propio formato de container (App container, appc) y runtime: rkt
Soporta el formato de container de docker.
Son una serie de herramientas que permiten ejecutar un container y aislarlo en diferentes niveles (distintos plugins nos dan diferentes aislamientos)


LXD: container "hypervisor" desarollado por Canonical. Gestor de containers LXC
