Cogiendo templates de un directorio:
http://jinja.pocoo.org/docs/dev/api/#basics
app/src/NOMBRE/templates/mytemplate.html

from jinja2 import Environment,PackageLoader
env = Environment(loader=PackageLoader('NOMBRE', 'templates'))
template = env.get_template('mytemplate.html')


# Cargar todas las variables locales en el contexto de jinja
http://webpy.org/cookbook/template_jinja

from jinja2 import Environment,FileSystemLoader
import os

body = render_template('dynamic_info.html', **locals())

def render_template(template_name, **context):
    extensions = context.pop('extensions', [])
    globals = context.pop('globals', {})

    jinja_env = Environment(
            loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
            extensions=extensions,
            )
    jinja_env.globals.update(globals)

    #jinja_env.update_template_context(context)
    return jinja_env.get_template(template_name).render(context)
