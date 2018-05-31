http://docs.ansible.com/developing_plugins.html#filter-plugins

If you want more Jinja2 filters available in a Jinja2 template (filters like to_yaml and to_json are provided by default), they can be extended by writing a filter plugin. Most of the time, when someone comes up with an idea for a new filter they would like to make available in a playbook, we’ll just include them in ‘core.py’ instead.

Parece que ya no hay que meterlos en "core.py".
Los meteremos en nuestro directorio (o en la raiz del rol) en filter_plugins
Lo llamaremos de alguna manera que no coincida con los oficiales (NO llamarle core.py, ipaddr, json_query, mathstuff, network, urlsplit, mirar /usr/lib/python2.7/site-packages/ansible/plugins/filter)


Ejemplo tonto:
def adri(values=[]):
    return values


class FilterModule(object):
    def filters(self):
        return {
                'adri': adri,
        }

