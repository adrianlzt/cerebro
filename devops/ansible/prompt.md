http://docs.ansible.com/playbooks_prompts.html

Preguntar el valor de ciertas variables al usuario.
O de forma compacta, o extendida, no mezclar.

Las variables solo tienen validez en el host donde se definen.
Si definimos varios vars_prompt en disintos hosts, nos preguntará todos los valores al comienzo de la ejecucción.

  vars_prompt:
    name: "what is your name?"
    quest: "what is your quest?"
    favcolor: "what is your favorite color?"

  vars_prompt:
    - name: "release_version"
      prompt: "Product release version"
      default: "1.0"
      private: no

    - name: "some_password"
      prompt: "Enter password"
      private: yes

    - name: "my_password2"
      prompt: "Enter password2"
      private: yes
      confirm: yes
      encrypt: "md5_crypt"
      salt_size: 7

apt-get install python-passlib
  para poder usar claves encriptadas
