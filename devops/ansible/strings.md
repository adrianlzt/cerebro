Mirar en jinja/ para mas posibilidades

  - name: prueba
    command: echo "hola adrios"
    register: prueba

  - debug: var=prueba

  - name: segundo
    debug: msg="{{prueba.stdout.replace('a','b')}}"
