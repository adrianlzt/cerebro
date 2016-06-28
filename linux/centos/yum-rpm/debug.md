rpm -i -vvvvv fichero.rpm

yum -v ....
  verbose

yum --rpmverbosity=xxx ...
  critical,  emergency,  error, warn and debug.


yum -v --rpmverbosity=debug ...

python -m pdb /usr/bin/yum ...

YUM_PDB yum ...
http://lists.baseurl.org/pipermail/yum-devel/2009-September/005877.html
si peta te saca a la consola de pdb


# Verificar el pkg
> /usr/lib/python2.7/site-packages/yum/packages.py(952)verifyLocalPkg()

