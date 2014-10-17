File not found: /root/rpmbuild/BUILDROOT/nagios-plugins-2.0.2-1.x86_64/etc/nagios/command.cfg

Buscar el fichero en el .spec y borrarlo



error: Installed (but unpackaged) file(s) found
http://www.cyberciti.biz/faq/rhel-centos-linuxrpmbuild-error-installed-but-unpackaged-files-found/
To fix this error you need to specify the list of files that will be installed. This is done usong "%files" section.
