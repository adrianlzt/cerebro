yum install createrepo

Copiar los paquetes .rpm junto con nuestra clave pública a un directorio (accesible por http).
Ejecutar el comando: $ createrepo mirepo/
Crear el fichero .repo: $ vi mirepo/mirepo.repo

[mirepo-repo]
name=My ABC yum repository
baseurl=http://whatever.example.com/abc
gpgkey=http://whatever.example.com/RPM-GPG-KEY-ABC
Cuando se modifiquen paquetes en el repositorio, volver a ejecutar createrepo


Para un repo local:
[local]
name=Local Repo
baseurl=file:///var/repo
enabled=1
gpgcheck=0
protect=1
