http://www.centos.org/keys/

Deberia venir instalada, pero si no:
curl http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-7 -o /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

Otra opción:
sed -i s/'gpgcheck=1'/'gpgcheck=0'/ /dir/tmp/etc/yum.repos.d/*
