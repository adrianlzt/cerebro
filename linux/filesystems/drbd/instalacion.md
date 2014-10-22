http://www.drbd.org/users-guide/s-distro-packages.html#_centos
http://geekpeek.net/drbd-how-to-configure-drbd-on-centos/

Necesitamos un disco adicional, /dev/sdb por ejemplo

service iptables stop
rpm -ivh http://elrepo.org/elrepo-release-6-5.el6.elrepo.noarch.rpm
yum install -y kmod-drbd83 drbd83-utils
modprobe drbd
cat <<END > /etc/drbd.d/disk1.res
resource disk1
{
startup {
wfc-timeout 30;
outdated-wfc-timeout 20;
degr-wfc-timeout 30;
}

net {
cram-hmac-alg sha1;
shared-secret sync_disk;
}

syncer {
rate 100M;
verify-alg sha1;
}

on node1 {
device minor 1;
disk /dev/sdb;
address 192.168.51.2:7789;
meta-disk internal;
}

on node2 {
device minor 1;
disk /dev/sdb;
address 192.168.51.3:7789;
meta-disk internal;
}
}
END

echo "192.168.51.2 node1" >> /etc/hosts
echo "192.168.51.3 node2" >> /etc/hosts

Necesitan tener ntp, quick fix:
echo "1 * * * * root ntpdate ntpdate 1.es.pool.ntp.org" >> /etc/crontab

Initialize DRBD meta data
drbdadm create-md disk1
  normal que salgan unos mensajes

En el node1:
drbdadm -- --overwrite-data-of-peer primary disk1

Mirando en 
cat /proc/drbd 
tenemos que esperar hasta que termine la sync

También 
/etc/init.d/drbd status
Nos tendrá que decir:
1:disk1  Connected  Secondary/Secondary  UpToDate/UpToDate  C

mount /dev/drbd1 /mnt
