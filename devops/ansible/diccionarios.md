http://docs.ansible.com/ansible/intro_configuration.html#hash-behaviour

Mergear variables que sean diccioarios y se llamen igual:

ansible.cfg
[defaults]
hash_behaviour=merge

[DEPRECATION WARNING]: DEFAULT_HASH_BEHAVIOUR option, This feature is fragile and not portable, leading to continual confusion and misuse , use the ``combine`` filter explicitly instead. This feature will be removed in version 2.13. Deprecation warnings can be disabled by setting deprecation_warnings=False in ansible.cfg.



Si tenemos un diccionario de valores definido dos veces, se mergea el diccionario.
Si un valor está repetido, se guarda el que tiene más preferencia.


formatting:
  from-game:
    chat: '(%sender%) %message%'
    action: '* %sender% %message%'

Formato inline:
formatting: {from-game: {chat: '(%sender%) %message%', action: '* %sender% %message%'}}

