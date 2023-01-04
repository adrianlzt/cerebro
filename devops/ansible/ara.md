https://github.com/ansible-community/ara

Para guardar las ejecuciones de los playbooks.

pipenv shell
pipenv install ansible "ara[server]"
export ANSIBLE_CALLBACK_PLUGINS="$(python3 -m ara.setup.callback_plugins)"
ansible-playbook foo.yaml
ara-manage migrate
ara-manage runserver

Borrar ejecuciones antiguas
ara playbook list -c "id" -f "csv" --quote "none" | grep -v id | xargs -n 1 ara playbook delete

Al usar el "ara playbook list" solo saca unos cuantos.
De esta manera sacamos todos los ids:
sqlite3 ~/.ara/server/ansible.sqlite "select id from playbooks;" | xargs -n 1 ara playbook delete
