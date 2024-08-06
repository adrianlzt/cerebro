<https://docs.ansible.com/ansible/latest/plugins/lookup.html>

Lista de plugins
ansible-doc -t lookup -l

Extraer información de distintos sitios:

  vars:
    contents: "{{ lookup('file', '/etc/foo.txt') }}"

  tasks:

     - debug: msg="{{ lookup('env','HOME') }} is an environment variable"

     - debug: msg="{{ item }} is a line from the result of this command"
       with_lines:
         - cat /etc/motd

     - debug: msg="{{ lookup('pipe','date') }} is the raw result of running this command"

     - debug: msg="{{ lookup('redis_kv', 'redis://localhost:6379,somekey') }} is value in Redis for somekey"

     - debug: msg="{{ lookup('dnstxt', 'example.com') }} is a DNS TXT record for example.com"

     - debug: msg="{{ lookup('template', './some_template.j2') }} is a value from evaluation of this template"

vars:
  motd_value: "{{ lookup('file', '/etc/motd') }}"

tasks:

- debug: msg="motd value is {{ motd_value }}"

Podemos usar lookup para definir la variable ansible_password que se usará para conectar.
Podemos poner este lookup en el inventario:
  ansible_password="{{ lookup('pipe', 'pass servers/foo') }}"

Obtener ip de un dominio:
lookup('dig', 'example.com.')

Leer un fichero yaml (por ejemplo para usarlo con un with_items):
{{ lookup('file','containers.yaml') | from_yaml }}

# Gestionar errores

errors to ignore, warn, or stric

```yaml
debug: msg="{{ lookup('file', '/nosuchfile', errors='ignore') }}"
```

Si usamos el ignore al definir una variable, la deja definida pero vacía.

Si el lookup se supone que devuelve un dict y luego estamos extrayendo keys de ahí, fallará porque el lookup devuelve un None.
Podemos usar " | default('xxx')" en ese caso para que no falle.
