https://github.com/ImmobilienScout24/yum-repo-server

The yum-repo-server is a server that allows you to host and manage YUM repositories using a RESTful API.

Ejemplo de uso: un repo virtual donde apuntan todas las máquinas.
Ese repo virtual va apuntando a diferentes repos reales donde existen diferentes versiones del SW que queremos desplegar.
De esta manera, desplegar un nuevo SW es tan fácil como mover ese puntero del repo virtual a la release que queremos, y hacer yum update en las máquinas.
