yum install rpm-build


$ rpmbuild --help

  -bp                           build through %prep (unpack sources and apply patches) from <specfile>
  -bc                           build through %build (%prep, then compile) from <specfile>
  -bi                           build through %install (%prep, %build, then install) from <specfile>
  -bl                           verify %files section from <specfile>
  -ba                           build source and binary packages from <specfile>
  -bb                           build binary package only from <specfile>
  -bs                           build source package only from <specfile>
  -tp                           build through %prep (unpack sources and apply patches) from <tarball>
  -tc                           build through %build (%prep, then compile) from <tarball>
  -ti                           build through %install (%prep, %build, then install) from <tarball>
  -ta                           build source and binary packages from <tarball>
  -tb                           build binary package only from <tarball>
  -ts                           build source package only from <tarball>


Generar rpm a partir de un .tar.gz
Tiene el fichero .spec en un directorio support/
wget http://www.mod-gearman.org/download/v1.5.0/src/mod_gearman-1.5.0.tar.gz
rpmbuild -tb mod_gearman-1.5.0.tar.gz
