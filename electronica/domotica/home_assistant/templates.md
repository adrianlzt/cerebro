Ejemplos:

{%- if is_state("switch.luz_{{ Room | replace(' ', '_') }}", "on") -%}Luz ya encendida{%- endif -%}

