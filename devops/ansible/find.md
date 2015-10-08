    - name: test
      command: echo "hola"
      register: result
      until: result.stdout.find("adios") != -1 or result.stdout.find("hola") != -1
      retries: 36
      delay: 5

.find("cadena")
devuelve la posición donde encuentra la cadena
devuelve -1 si no encuentra nada


No encuentra cadena:
.find("cadena") == -1

Encuentra cadena:
.find("cadena") != -1
  
