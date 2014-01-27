Ejemplo:

[OL63]
name=Oracle Linux 6.3 x86_64
baseurl=file:///var/OSimage/OL6.3_x86_64
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY
gpgcheck=1 
enabled=1 

Es necesario tener instalado el paquete createrepo:
yum install createrepo

Luego entrar al directorio y crear el repo:
createrepo /var/OSimage/OL6.3_x86_64
