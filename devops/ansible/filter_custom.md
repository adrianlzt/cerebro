http://docs.ansible.com/developing_plugins.html#filter-plugins

If you want more Jinja2 filters available in a Jinja2 template (filters like to_yaml and to_json are provided by default), they can be extended by writing a filter plugin. Most of the time, when someone comes up with an idea for a new filter they would like to make available in a playbook, we’ll just include them in ‘core.py’ instead.

https://github.com/ansible/ansible/blob/devel/lib/ansible/runner/filter_plugins/core.py
