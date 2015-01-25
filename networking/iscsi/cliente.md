http://en.community.dell.com/techcenter/enterprise-solutions/w/oracle_solutions/1224.how-to-discover-login-and-logout-iscsi-targets


sudo apt-get install open-iscsi

$ sudo iscsiadm -m discovery -t st -p 192.168.1.44
192.168.1.44:3260,1 iqn.2004-05.com.ubuntu:maas:ephemeral-amd64-generic-precise-release
192.168.1.44:3260,1 iqn.2004-05.com.ubuntu:maas:ephemeral-amd64-generic-trusty-release

Sincronizar con las unidades iSCSI:
sudo iscsiadm -m node --login

Con una unidad específicamente:
iscsiadm -m node -T <Complete Target Name> -l -p <Group IP>:3260


Podremos verlos en el dmesg como sdb, sdc...
Se montarán todos los que hayamos visto en el discovery.

sudo mount /dev/sdb /mnt


Desincronizar con las unidades iSCSI:
sudo iscsiadm -m node -u

Desync de una específica:
iscsiadm -m node -u -T <Complete Target Name>-p <Group IP address>:3260
