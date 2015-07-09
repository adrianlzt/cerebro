http://docs.ansible.com/pip_module.html

- pip: name=bottle

- pip: name=bottle state=latest

- pip: name=bottle state=1.0.0
parece que esto no vale para hacer downgrade
