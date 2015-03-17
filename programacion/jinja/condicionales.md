http://jinja.pocoo.org/docs/dev/templates/#tests

{% if service %}
hola service
{% endif %}

# Poner una coma solo si no es el último elemento
"DB_HOSTS": "{% for ip in mongodb_hosts %} {{ip}}:27017{% if not loop.last %},{% endif %}{% endfor %}",


{% if kenny.sick %}
    Kenny is sick.
{% elif kenny.dead %}
    You killed Kenny!  You bastard!!!
{% else %}
    Kenny looks okay --- so far
{% endif %}


Una variable definida en ansible como:
variable: ""
En un if se considera false


Comprueba si una variable esta definida
{% if melaintento is defined %}
variable definida
{% endif %}



- name: a play that runs entirely on the ansible host
  hosts: 127.0.0.1
  vars:
    - var_empty: ''
  connection: local
  gather_facts: false
  tasks:
  - name: prueba
    template: src=template.j2 dest=/tmp/ansible/destino

$ cat template.j2 
{% if var_undefined is defined %}
pon var_undefined {{ var_undefined }}
{% else %}
var_undefined is not defined
{% endif %}

{# esto falla
{% if var_undefined %}
if var_undefined {{ var_undefined }}
{% endif %}
#}

{% if var_empty is defined %}
var_empty is defined {{ var_empty }}
{% else %}
var_empty is not defined
{% endif %}

{% if var_empty %}
if var_empty {{ var_empty }}
{% else %}
var_empty is false
{% endif %}


$ cat destino 
var_undefined is not defined
var_empty is defined 
var_empty is false
