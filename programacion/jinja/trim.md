http://jinja.pocoo.org/docs/dev/templates/#whitespace-control


    jinja_env = Environment(
            loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
            extensions=extensions, lstrip_blocks=True, trim_blocks=True
            )


Eliminar espacios en blanco generados por bloques (if, etc)
