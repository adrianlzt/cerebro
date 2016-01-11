https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/sec-Configuring_Yum_and_Yum_Repositories.html
http://linux.die.net/man/5/yum.conf

Explicación de las variables:
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/sec-Using_Yum_Variables.html

Para conocer los valores (basearch, releasever, etc):
python -c 'import yum, pprint; yb = yum.YumBase(); pprint.pprint(yb.conf.yumvar, width=1)'

# Releasever
Parece que centos devuelve 7 y redhat 7Server
You can use this variable to reference the release version of Red Hat Enterprise Linux. Yum obtains the value of $releasever from the distroverpkg=value line in the /etc/yum.conf configuration file. If there is no such line in /etc/yum.conf, then yum infers the correct value by deriving the version number from the redhat-releaseproduct package that provides the redhat-release file.


Si tenemos que usar el repo para algo utilizaremos la key (entre corchetes)

Configuracion:
[main]
name=nombre descriptivo
cachedir=/var/cache/yum/$basearch/$releasever
keepcache=0
debuglevel=2
logfile=/var/log/yum.log
exactarch=1
obsoletes=1
gpgcheck=1
plugins=1
installonly_limit=3

exclude
  permite quitar algunos paquetes de este repo

metadata_expire
  cada cuanto caduca la metadata, por defecto 6h




http://wiki.centos.org/AdditionalResources/Repositories

Oficial de CentOS 6.6:
http://ftp.jaist.ac.jp/pub/Linux/CentOS/6.6/os/x86_64/Packages/

EPEL CentOS 6: 
rpm -Uvh "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"
http://dl.fedoraproject.org/pub/epel/6/x86_64/
src.rpms: http://mirror.uv.es/mirror/fedora-epel/6/SRPMS/

EPEL CentOS 7:
yum install http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
http://dl.fedoraproject.org/pub/epel/7/x86_64/

EPEL CentOS 5:
rpm -Uvh http://mirror.uv.es/mirror/fedora-epel//5Server/x86_64/epel-release-5-4.noarch.rpm


Repoforge
http://pkgs.repoforge.org/
https://github.com/repoforge/rpms
CentOS 7:
yum install http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el7.rf.x86_64.rpm

CentOS 6:
yum install http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm


ElRepo
rpm -Uvh http://elrepo.org/elrepo-release-6-5.el6.elrepo.noarch.rpm

IUS
https://iuscommunity.org/pages/Repos.html
http://dl.iuscommunity.org/pub/ius/stable/CentOS/6/x86_64/ius-release-1.0-13.ius.centos6.noarch.rpm
http://dl.iuscommunity.org/pub/ius/stable/CentOS/6/

Remirepo:
Para rhel6
http://rpms.famillecollet.com/enterprise/6/remi/x86_64/repoview/


Lista de repositorios activos
yum repolist
Con url: yum repolist -v

Limpiar metadata de un repo:
yum clean metadata --disablerepo="*" --enablerepo="repo*"


[puppet-epg]
name=puppet-epg
baseurl=http://repos.com/redhat/puppet-x86_64/RPMS.all/
enabled=0
gpgcheck=0
#proxy=http://proxy.com:45445



Repo con autentificación:
[nginx-plus]
name=nginx-plus repo
baseurl=https://plus-pkgs.nginx.com/centos/6/$basearch/
sslcacert=/etc/ssl/nginx/CA.crt
sslclientcert=/etc/ssl/nginx/nginx-repo.crt
sslclientkey=/etc/ssl/nginx/nginx-repo.key
gpgcheck=0
enabled=1

Para acceder a este repo hace falta un client cert valido



Local
crear_repo.md



# Funcionamiento
Cuando definimos un repo, el cliente yum va a preguntar por el fichero REPO/repodata/repomd.xml

La especificación de este fichero está en: https://github.com/openSUSE/libzypp/blob/master/zypp/parser/yum/schema/repomd.rng

En repomd.xml se definen los ficheros other filelists y primary que se bajará después donde está la información de los rpms.
