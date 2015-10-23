Cuidado al usar numeros sacados de variables en playbooks, estilo:

vars:
  - pepe: "{{variable | int}}"

pepe siempre será un string
