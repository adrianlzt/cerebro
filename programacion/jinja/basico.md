http://jinja.pocoo.org/docs/dev/intro/#basic-api-usage
>>> from jinja2 import Template
>>> template = Template('Hello {{ name }}!')
>>> template.render(name='John Doe')
