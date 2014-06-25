Prioridades
http://wiki.centos.org/PackageManagement/Yum/Priorities
Para configurar distintas prioridades para los distintos repositorios.
Cuidado, mirar los “alerts” de la web.
Recomendado cuando se empiezan a meter distintos repos para que paquetes de repos no “buenos” pisen paquetes de las repos oficiales.

priority=N
N is an integer from 1 to 99. The default priority for repositories is 99. The repositories with the lowest numerical priority number have the highest priority.
