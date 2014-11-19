http://jinja.pocoo.org/docs/templates/
http://docs.ansible.com/template_module.html
jinja.md

{% for item in navigation %}
  <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
{% endfor %}

{{ a_variable }}


Las variables las sacamos del 'setup' (los facts)

Ejemplo:
Tengo las ips: {{ ansible_all_ipv4_addresses }}
Varible entorno: {{ ansible_env.LESSOPEN }}


- name: set custom facts file
  template: src=general.json.j2 dest=/tmp/ansible/general.json backup=yes
  notify:
    - Restart nrpe

El backup=yes hará que si existe un fichero distinto lo mueva a NOMBRE.YYYY-MM-DD@HH:MM~

Será típico tambien tener el notify para reiniciar un proceso en caso de cambio.
