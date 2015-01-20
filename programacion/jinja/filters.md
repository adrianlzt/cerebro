## Filters http://jinja.pocoo.org/docs/templates/#builtin-filters

{{ variable.replace('a','b') }}


http://docs.ansible.com/playbooks_variables.html#jinja2-filters

{{ 'ansible' | regex_replace('^a.*i(.*)$', 'a\\1') }}

Borrar parte de una variable:
{{project_registration_task.location | regex_replace('/cyclops/v1/','') }}
