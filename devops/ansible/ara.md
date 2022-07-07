https://github.com/ansible-community/ara

Para guardar las ejecuciones de los playbooks.

pipenv shell
pipenv install ansible "ara[server]"
export ANSIBLE_CALLBACK_PLUGINS="$(python3 -m ara.setup.callback_plugins)"
ansible-playbook foo.yaml
ara-manage runserver
