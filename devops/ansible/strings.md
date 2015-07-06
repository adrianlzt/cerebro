Mirar en jinja/ para mas posibilidades

  - name: prueba
    command: echo "hola adrios"
    register: prueba

  - debug: var=prueba

  - name: segundo
    debug: msg="{{prueba.stdout.replace('a','b')}}"


Convertir lowercase / uppercase
  - name: prueba
    command: echo {{var.lower() }}
  - name: prueba
    command: echo {{var.upper() }}

