http://jinja.pocoo.org/docs/dev/templates/#for

{% for hostgroup in hostgroups %}
    <a href="{{wiki_url}}/{{hostname}}">{{wiki_url}}/{{hostname}}</a>
    <br>
{% else %}
  que hacer si no hay elementos en hostgroups
{% endfor %}

Una linea por cada vuelta sin lineas en blanco
{% for hostgroup in hostgroups -%}
{{hostgroup}}
{% endfor %}

{% for h in hosts %}
  {{h.endpoint}}
{% endfor %}



Ejemplo de bucle inline:
CONNECTSTRING={% for host in groups['db_mgm'] %} {{ hostvars[host][interface].ipv4.address  }}:1186{% if not loop.last %},{% endif %}{% endfor %}

Primer host de un grupo
{% for host in groups['db_mgm'] %}{% if loop.first %}{{hostvars[host][interface].ipv4.address}}:1186{% endif %}{% endfor %}

Variables especiales de los loops:
https://blog.codecentric.de/en/2014/08/jinja2-better-ansible-playbooks-templates/

loop.index: The current iteration of the loop (1 indexed).
loop.index0: As before, but 0 indexed.
loop.revindex: The number of iterations from the end of the loop (1 indexed).
loop.revindex0: As above, but (0 indexed).
loop.first: True if first iteration.
loop.last: True if last iteration.
loop.length: The number of items in the sequence.
loop.depth: Indicates how deep in a recursive loop the rendering is. Starts at level 1.
loop.depth0: As before, but starting with level 0.
loop.cycle: A helper function to cycle between a list of sequences. See the Jinja documentation for more details on how to use this.


# diccionario
{% for k,v in groups.iteritems() %}{{k}}{{v}}{% endfor %}


# Groupby + selecattr
{% for grouper, list in process_monitor__process_list|selectattr("cluster", "defined")|groupby('cluster') %}

Con esto hacemos un loop agrupando por la key "cluster" para aquellos dict que lo tengan definido.

