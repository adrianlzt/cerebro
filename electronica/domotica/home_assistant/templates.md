En la UI tenemos un render para probar las templates
http://192.0.0.1:8123/developer-tools/template

Ejemplos:
```
{%- if is_state("switch.luz_{{ Room | replace(' ', '_') }}", "on") -%}Luz ya encendida{%- endif -%}
```



Generar una variable a partir de una template
```
template:
  - sensor:
      # Variamos la densidad del gas segun estemos en invierno o verano
      - name: lpg_density
        unit_of_measurement: "kg/l"
        state: >
          {% set month = now().month %}
          {% if month > 3 and month < 11 %}
          {% set lpg_density = 0.5623 %} {## verano ##}
          {% else %}
          {% set lpg_density = 0.5448 %} {## invierno ##}
          {% endif %}
          {{ lpg_density }}
```


# Date
Unix epoch en segundos
{{ int(as_timestamp(now())) }}
