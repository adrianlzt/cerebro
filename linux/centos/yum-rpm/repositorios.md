https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/sec-Configuring_Yum_and_Yum_Repositories.html
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/sec-Using_Yum_Variables.html
http://linux.die.net/man/5/yum.conf

Explicación de las variables:
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/sec-Using_Yum_Variables.html

Para conocer los valores (basearch, releasever, etc):
python -c 'import yum, pprint; yb = yum.YumBase(); pprint.pprint(yb.conf.yumvar, width=1)'



# Releasever
$releasever This will be replaced with the value of the version of the package listed in distroverpkg. This defaults to the version of 'redhat-release' package.

Parece que centos devuelve 7 y redhat 7Server
Para conocer este valor se hace lo siguiente ($distroverpkg puede estar definida en /etc/yum.conf):

Para obtener la releasever, se pregunta a la bbdd de rpm quien provee $distroverpkg (o, si no está definida, se preguntará, por este orden: "system-release(releasever)", "redhat-release"):
rpm -q --whatprovides "system-release(releasever)" 

Del paquete que obtengamos, le preguntaremos que provee:
rpm -q --provides redhat-release-server-7.2-9.el7.x86_64

Y obtendremos la versión del parámetro $distroverpkg.

En un one-liner:
rpm -q --provides $(rpm -q --whatprovides "system-release(releasever)") | grep "system-release(releasever)" | cut -d ' ' -f 3

Si no devuelve nada, $releasever tomará el valor '$releasever'





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
yum install -y "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"
http://dl.fedoraproject.org/pub/epel/6/x86_64/
src.rpms: http://mirror.uv.es/mirror/fedora-epel/6/SRPMS/

EPEL CentOS 7:
yum install -y epel-release
yum install -y http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-9.noarch.rpm
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

Reeleer metadatos remotos para ver si son los que tenemos:
yum clean expire-cache

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


# Cache
La informacion de los repos bajada se almacena en
/var/cache/yum/x86_64/...

Explicación de cada uno de los ficheros: https://blog.packagecloud.io/eng/2015/07/20/yum-repository-internals/
repomd.xml: Essentially an index that contains the location, checksums, and timestamp of the other XML metadata files listed below.
primary.xml.gz: Contains detailed information about each package in the repository. You’ll find information like name, version, license, dependency information, timestamps, size, and more.
filelists.xml.gz: Contains information about every file and directory in each package in the repository.
other.xml.gz: Contains the changelog entries found in the RPM SPEC file for each package in the repository.


yum makecache
Is used to download and make usable all the metadata for the currently enabled yum repos. This is useful if you want to make sure the cache is fully current with all metadata before continuing.


