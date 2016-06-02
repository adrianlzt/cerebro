http://linux.die.net/man/5/yum.conf

/etc/yum.conf

/etc/yum.repos.d/


metadata_expire
  Cada cuando debe bajarse los metadatos, por defecto 6h


## Variables ##
There are a number of variables you can use to ease maintenance of yum's configuration files. They are available in the values of several options including name, baseurl and commands.

$releasever 
  This will be replaced with the value of the version of the package listed in distroverpkg. This defaults to the version of 'redhat-release' package.
$arch 
  This will be replaced with your architecture as listed by os.uname()[4] in Python.
$basearch 
  This will be replaced with your base architecture in yum. For example, if your $arch is i686 your $basearch will be i386.
  x86_64
$uuid 
  This will be replaced with a unique but persistent uuid for this machine. The value that is first generated will be stored in /var/lib/yum/uuid and reused until this file is deleted.
