http://docs.ansible.com/intro_installation.html

Ubuntu: http://docs.ansible.com/intro_installation.html#latest-releases-via-apt-ubuntu


sudo apt-get install software-properties-common
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible

# Arch
Tamién solemos tener las betas en AUR

# Codigo
http://releases.ansible.com/ansible/

tar zxvf ansible*.tgz
cd ansible*

Para generar rpm o deb mirar el Makefile
Para generar .egg:
  python setup.py build
  python setup.py bdist_egg
    para dejarnos un .egg para instalar con easy_install
