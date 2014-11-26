    - name: test
      command: echo "hola"
      register: result
      until: result.stdout.find("adios") != -1 or result.stdout.find("hola") != -1
      retries: 36
      delay: 5


