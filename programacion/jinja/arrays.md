Tamaño de un array:
{{ groups['maingroup'] | length }}


Solucionar problema de cuando un array nos pone los elementos como
[u'a', u'b']
https://stackoverflow.com/questions/41521138/ansible-template-adds-u-to-array-in-template
{{ value | to_json }}


# Unir
{{ ["a","b"] | union(["c"]) }}


# Elegir el elemento N
lista.0
lista.1
lista.N


# De una lista de diccionarios, hacer un lista separada por comas de un parámetro
ansible.builtin.set_fact:
  proxies_ips: >-
    {%- set valores_foo = [] -%}
    {%- for elem in groups.proxy -%}
        {%- set _ = valores_foo.append(hostvars[elem].ansible_default_ipv4.address) -%}
    {%- endfor -%}
    {{- valores_foo|join(',') -}}


