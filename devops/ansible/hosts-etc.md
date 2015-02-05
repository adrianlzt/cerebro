https://gist.github.com/rothgar/8793800


Crear el /etc/hosts con el hostname que dice la maquina
Si queremos usar el inventory name usar {{item}}, o {{host}} en el segundo ejemplo.

- name: "Build hosts file"
  lineinfile: dest=/etc/hosts regexp='.*{{ hostvars[item].ansible_hostname }}$' line="{{ hostvars[item].ansible_default_ipv4.address }} {{ hostvars[item].ansible_hostname }}" state=present
  when: hostvars[item].ansible_default_ipv4.address is defined
  with_items: groups['all']

O 
- name: Create the hosts file for all machines
  template: src=hosts.j2 dest=/etc/hostscon un template:

hosts.j2
{% for host in groups['all'] %}
{{ hostvars[host].ansible_default_ipv4.address }}  {{ hostvars[host].ansible_hostname }}
{% endfor %}
