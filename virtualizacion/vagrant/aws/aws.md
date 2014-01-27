https://github.com/mitchellh/vagrant-aws
http://juanvicenteherrera.eu/2013/09/04/immutable-servers-with-vagrant-and-chef-chapter-i/
http://www.slideshare.net/juanvicenteherrera/md-vagrant-chefawssept2013novideo

Deploy en AWS con vagrant:

vagrant plugin install vagrant-aws
vagrant box add dummy https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box

Copiar Vagrantfile.aws (los parámetros son analizados en orden, por lo que si hay dos parámetros que fallan, si ponemos uno primero, saldrá su mensaje de error)
Modificar el fichero según necesidades
Si necesito credenciales mirar adrianRepo/nube/amazon/credenciales.md
Mirar en este directorio: aws_credentials.rb
Creo un key-pair y me bajo el .pem
Meto una AMI en mi repo

vagrant up --provider=aws

Hago como juanviz y me creo unos ficheros en ~/.aws/ para meter las KEYS y los .pem


Ejemplos de Vagrantfile para provisionar máquinas con Chef y teniendo en cuenta distintos entornos (qa, dev y demo)
https://github.com/juanviz/VagrantProjects
