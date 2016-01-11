http://docs.ansible.com/pip_module.html

- pip: name=bottle

- pip: name=bottle state=latest

- pip: name=bottle state=1.0.0
parece que esto no vale para hacer downgrade


http://docs.ansible.com/ansible/easy_install_module.html
- easy_install: name=httplib2

- easy_install: name=bottle virtualenv=/webapps/myapp/venv
