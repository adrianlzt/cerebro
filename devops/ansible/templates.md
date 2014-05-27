http://jinja.pocoo.org/docs/templates/
http://docs.ansible.com/template_module.html

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

El backup=yes hará que si existe un fichero distinto lo mueva a NOMBRE.YYYY-MM-DD@HH:MM~
