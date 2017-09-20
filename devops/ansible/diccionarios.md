http://docs.ansible.com/ansible/intro_configuration.html#hash-behaviour

Mergear variables que sean diccioarios y se llamen igual:

ansible.cfg
[defaults]
hash_behaviour=merge


Si tenemos un diccionario de valores definido dos veces, se mergea el diccionario.
Si un valor está repetido, se guarda el que tiene más preferencia.


formatting:
  from-game:
    chat: '(%sender%) %message%'
    action: '* %sender% %message%'

Formato inline:
formatting: {from-game: {chat: '(%sender%) %message%', action: '* %sender% %message%'}}

