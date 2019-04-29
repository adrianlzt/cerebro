Mirar api.md

Instalar versión de development (master de git):
pip install git+https://github.com/ansible/ansible.git@devel


# Como ansible busca que plugin ejecutar
/usr/lib/python2.7/site-packages/ansible/runner/__init__.py 
        module_path = utils.plugins.module_finder.find_plugin(module_name, module_suffixes, transport=self.transport)


http://releases.ansible.com/ansible/ansible-2.0.0-0.2.alpha2.tar.gz 
tar xvf ansible-2.0.0-0.2.alpha2.tar.gz
cd ansible-2.0.0
python setup.py build
PYTHONPATH=lib/ bin/ansible  --version

medio error:
ansible 2.0.0 
  lib/ansible/modules/core:  not found - use git submodule update --init lib/ansible/modules/core
  lib/ansible/modules/extras:  not found - use git submodule update --init lib/ansible/modules/extras
  config file = /home/adrian/.ansible.cfg
  configured module search path = None


