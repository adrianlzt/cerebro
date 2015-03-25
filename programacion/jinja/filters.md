## Filters http://jinja.pocoo.org/docs/templates/#builtin-filters

{{ variable.replace('a','b') }}



Solo de ansible:

http://docs.ansible.com/playbooks_variables.html#jinja2-filters
http://docs.ansible.com/playbooks_filters.html

{{ 'ansible' | regex_replace('^a.*i(.*)$', 'a\\1') }}

Borrar parte de una variable:
{{project_registration_task.location | regex_replace('/cyclops/v1/','') }}


  - name: prueba
    pause: prompt="echo {{ 'ansible' | regex_replace('^a.*i(.*)$', 'a\\1') }}"

