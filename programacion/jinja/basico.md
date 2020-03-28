http://jinja.pocoo.org/docs/dev/intro/#basic-api-usage
>>> from jinja2 import Template
>>> template = Template('Hello {{ name }}!')
>>> body = template.render(name='John Doe')


Con fichero:
import jinja2
template = jinja2.Environment(loader=jinja2.FileSystemLoader(".")).get_template("service_container.j2")
template.render(docker="/var/run/docker/docker.sock", id="asdasda")


Leer template de un fichero y variables de un fichero json ({"data": DATOS}). Sacar por pantalla:
import json
import jinja2
template = jinja2.Environment(loader=jinja2.FileSystemLoader(".")).get_template("template.j2")
with open("minio.json") as fd:
    data = json.load(fd)
    print(template.render(data))

