## Filters http://jinja.pocoo.org/docs/templates/#builtin-filters

{{ variable.replace('a','b') }}

{{group_names|map('replace','m','X')|list}}
{{group_names|map('replace','m','X')|join(',')}}


variable.split(".")[0]


Solo de ansible:

http://docs.ansible.com/playbooks_variables.html#jinja2-filters
http://docs.ansible.com/playbooks_filters.html

{{ 'ansible' | regex_replace('^a.*i(.*)$', 'a\\1') }}

Borrar parte de una variable:
{{project_registration_task.location | regex_replace('/cyclops/v1/','') }}


  - name: prueba
    pause: prompt="echo {{ 'ansible' | regex_replace('^a.*i(.*)$', 'a\\1') }}"



Dar un valor por defecto si la variable no esta definida:
{{adri_pepe1 | default('pepito')}}


{{ convertir_a_json | to_json }}


# map
http://jinja.pocoo.org/docs/dev/templates/#map
Users on this page: {{ users|map(attribute='username')|join(', ') }}
Users on this page: {{ titles|map('lower')|join(', ') }}



# selecattr
Comprobar si en ese "path" el valor es igual al pasado como parámetro:
selectattr("cluster.virtual_host", "equalto", "hostAB")
