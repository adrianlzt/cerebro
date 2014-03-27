Se puede almacenar la respuesta de un módulo:

- name: set custom facts file
  template: src=general.json.j2 dest="{{ facter_dir }}/general.json" backup=yes
  register: result

# Para ver el contenido
- debug: var=result


Podemos utilizar varias veces esa misma variable.

