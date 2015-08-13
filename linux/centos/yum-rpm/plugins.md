http://yum.baseurl.org/wiki/YumUtils#Plugins

http://bencane.com/2013/12/23/yum-plugins-verifying-packages-and-configurations-with-yum-verify/
/etc/yum.conf
[main]
plugins=1


Para desactivar un plugin
/etc/yum/pluginconf.d/<plugin-name>.conf
enabled=0
