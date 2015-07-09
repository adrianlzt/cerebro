MEJOR usar vmcontrol
yum install VMware-vSphere-CLI
/opt/vmware/vcli/apps/vm/vmcontrol.pl --server XXXX --username XXXX --vmname XXXX --operation
  se puede pasar también --password




https://developercenter.vmware.com/web/dp/tool/vsphere_cli/6.0?h=vSphere%20CLI
VMware-vSphere-CLI-6.0.0-2503617.x86_64.tar.gz

Doc uso: http://pubs.vmware.com/vsphere-60/index.jsp?topic=%2Fcom.vmware.vcli.getstart.doc%2Fcli_about.html&__utma=207178772.1608374490.1428300415.1428300415.1428300415.1&__utmb=207178772.0.10.1428300415&__utmc=207178772&__utmx=-&__utmz=207178772.1428300415.1.1.utmcsr=lists.linux-ha.org|utmccn=(referral)|utmcmd=referral|utmcct=/pipermail/linux-ha-dev/2011-April/018446.html&__utmv=-&__utmk=108649473


Módulos precompilados para RHEL.

Requisitos:
yum install tar openssl-devel e2fsprogs

Al instalar nos preguntará directorio de instalacion
Elijo /usr/local/bin

Cosas instaladas:
/usr/share/perl5/WSMan
/usr/share/perl5/VMware
/usr/lib64/perl5/ (muchas cosas)
/usr/local/lib/vmware-vcli
/usr/local/share/doc/vmware-vcli
/usr/bin/esx* (varios)
/usr/bin/vi* (varios)
Estos binarios de /usr/bin están enlazados con los de verdad, en /usr/local/bin

/etc/vmware-vcli/config
libdir = "/usr/local/lib/vmware-vcli"



Problemas vistos en centos-6.6
The following Perl modules were found on the system but may be too old to work
with vSphere CLI:

MIME::Base64 3.14 or newer
version 0.78 or newer



Para desinstalar
/usr/local/bin/vmware-uninstall-vSphere-CLI.pl


# Uso
vmware-cmd --username USER --password 'XXX' -H ip.del.server ...


# Cliente en perl basico
https://pubs.vmware.com/vsphere-51/index.jsp?topic=%2Fcom.vmware.perlsdk.pg.doc%2Fviperl_modscripts.4.2.html

perl prueba_vmware.pl --entity VirtualMachine --server ip.del.vcenter.server --username USER --password 'PASS'
  para obtener todos los hosts
