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



Por red:
python3 -m http.server 8080

[monitorizacion]
name=Monitorizacion
baseurl=http://172.17.0.1:8080/
gpgcheck=0
enabled=1

