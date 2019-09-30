{{ dict.value }}

# Loops
http://blog.mattcrampton.com/post/31254835293/iterating-over-a-dict-in-a-jinja-template

{% for key, value in _dict.iteritems() %}
      <dt>{{ key }}</dt>
      <dd>{{ value }}</dd>
{% endfor %}


# Diccionario -> lista -> valor
A partir de un diccionario (hostvars), acceder a una de las variables
'{{ hostvars.items() | list | selectattr("1.cluster.virtual_host", "equalto", "hostAB") | list }}'

Convertimos el dict en un array de tuplas (key, value).
Con el selectattr "1." elige el segundo elmento de la tupla.
Luego navegamos hasta el valor que queremos y lo comparamos con lo que necesitamos.
Luego generamos una lista para imprimirlo por pantalla.


# Selecionar un valor del dict
Solo nos quedamos con el valor de "email":
diccionario | map(attribute="email")

