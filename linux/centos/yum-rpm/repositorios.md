Oficial de CentOS 6.6:
http://ftp.jaist.ac.jp/pub/Linux/CentOS/6.6/os/x86_64/Packages/


http://wiki.centos.org/AdditionalResources/Repositories

EPEL CentOS 6: 
rpm -Uvh "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"
http://dl.fedoraproject.org/pub/epel/6/x86_64/

EPEL CentOS 7:
yum install http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm
http://dl.fedoraproject.org/pub/epel/7/x86_64/


Repoforge
rpm -Uvh http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
http://pkgs.repoforge.org/

ElRepo
rpm -Uvh http://elrepo.org/elrepo-release-6-5.el6.elrepo.noarch.rpm

IUS
https://iuscommunity.org/pages/Repos.html
http://dl.iuscommunity.org/pub/ius/stable/CentOS/6/x86_64/ius-release-1.0-13.ius.centos6.noarch.rpm
http://dl.iuscommunity.org/pub/ius/stable/CentOS/6/


Lista de repositorios activos
yum repolist
Con url: yum repolist -v


[puppet-epg]
name=puppet-epg
baseurl=http://repos.com/redhat/puppet-x86_64/RPMS.all/
enabled=0
gpgcheck=0
#proxy=http://proxy.com:45445


