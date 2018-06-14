http://docs.ansible.com/playbooks_lookups.html
https://github.com/ansible/ansible/tree/devel/lib/ansible/runner/lookup_plugins

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
