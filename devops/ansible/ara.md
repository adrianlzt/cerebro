<https://github.com/ansible-community/ara>

Para guardar las ejecuciones de los playbooks.

Con pipenv:

```bash
pipenv shell
pipenv install ansible "ara[server]"
export ANSIBLE_CALLBACK_PLUGINS="$(python3 -m ara.setup.callback_plugins)"
ansible-playbook foo.yaml
ara-manage migrate
ara-manage runserver
```

Con uv:

```bash
export ANSIBLE_CALLBACK_PLUGINS="$(uv run --with 'ara[server]' python3 -m ara.setup.callback_plugins)"
ansible-playbook foo.yaml
uv run --with 'ara[server]' ara-manage migrate
uv run --with 'ara[server]' ara-manage runserver
```

Borrar ejecuciones antiguas
ara playbook list -c "id" -f "csv" --quote "none" | grep -v id | xargs -n 1 ara playbook delete

Al usar el "ara playbook list" solo saca unos cuantos.
De esta manera sacamos todos los ids:
sqlite3 ~/.ara/server/ansible.sqlite "select id from playbooks;" | xargs -n 1 ara playbook delete

# API server

Para tener un punto central donde almacenar.

<https://ara.readthedocs.io/en/latest/container-images.html>

Cambiar en las settings las IPs de las que se aceptan llamadas.
Poner "*" para aceptar de cualquier lado.

docker run --name ara-deployment-mm --detach --tty \
  --volume $PWD/data:/opt/ara:z \
  -p 8008:8000 \
  -p 8009:8001 \
  --security-opt seccomp=unconfined \
  docker.io/recordsansible/ara-api:latest

Lo de seccomp es por un bug de docker+centos7, que no me permite ejecutar el ara-runmanage runserver

Para arrancar la interfaz web
docker exec -it ara-deployment-mm ara-manage runserver 0.0.0.0:8009
