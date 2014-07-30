Tar no almacena ni conserva los contextos selinux.

Tras extraer un tar debemos poner los contextos:
tar -xvf archive.tar | restorecon -f -

Para crear tars que almacenen los contextos:
tar --selinux -cf test.tar file
