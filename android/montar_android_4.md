Poner el móvil en modo MTP

apt-get install jmtpfs
packer -S jmtpfs
mkdir movil
jmtpfs movil

fusermount -u movil
