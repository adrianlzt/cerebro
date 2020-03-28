# obsoletes
Un paquete puede marcar otro como obsolete.

Si en un repo tenemos los dos paquetes, por ejemplo:
 A
 B (marca A como obsolete)

Si intentamos instalar A con yum, nos instalará la última versión que encuentre de B.


Ver que paquetes marca como obsoleto un rpm determinado
rpm -qp --obsoletes B.rpm


Instalar un paquete ignorando que está obsoleto
yum --setopt=obsoletes=0 install



# conflicts
Otra cosa similar es marcar conflictos entre paquetes, para evitar que dos paquetes estén instalados al mismo tiempo.

Consultar conflictos de un rpm:
rpm -qp --conflicts iometrics-agent-1.11.3-13.x86_64.rpm
