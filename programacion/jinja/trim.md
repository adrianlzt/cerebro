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



Algo                        Algo
{{ VARIABLE }}       --->   VARIABLE
fin                         fin

Algo                        AlgoVARIABLE
{{- variable }}      --->   fin
fin

Algo                       AlgoVARIABLEfin
{{- variable -}}     --->
fin

 {% if foo %}
 var: 123            --->      var: 123   (cuatro espacios en vez de dos, MAL)
 {% endif %}

 {% if foo -%}
 var: 123            --->    var: 123   (dos espacios, BIEN)
 {% endif %}


/usr/bin/cmd --some param
{%- if mivariable is defined %}
 {{ mivariable }}
{%- endif %}
 --more params

/usr/bin/cmd --some param True --more params

CUIDADO!
Si tenemos dos frases entre el {% %} y el {% fin %}, la segunda si tendrá los espacios en blanco


{%- hace que se borren todos los espacios en blanco y cambios de linea desde ese simbolo hasta el anterior caracter.
-%} lo mismo hacia la derecha


https://stackoverflow.com/questions/3790454/how-do-i-break-a-string-in-yaml-over-multiple-lines/21699210#21699210
Si estamos usando yaml con cosas tipo:
foo: >
  JINJA

Si queremos que el ">" no meta un cambio de línea al final, usar:
foo: >-

