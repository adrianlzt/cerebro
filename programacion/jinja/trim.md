http://jinja.pocoo.org/docs/dev/templates/#whitespace-control


    jinja_env = Environment(
            loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
            extensions=extensions, lstrip_blocks=True, trim_blocks=True
            )


Eliminar espacios en blanco generados por bloques (if, etc)


You can also strip whitespace in templates by hand. If you put an minus sign (-) to the start or end of an block (for example a for tag), a comment or variable expression you can remove the whitespaces after or before that block:

{% for item in seq -%}
  {{ item }}
{%- endfor %}
