Podemos ignorar un error de una task concreto:

- name: move nrpe.d to nrpe.manual
  copy: src=/etc/nrpe.d/ dest=/etc/nrpe.manual/
  ignore_errors: True



Se queda parada la ejecucción y estamos usando sudo.
Le estamos pasando la pass via -e, fichero hosts o prompt (-K) ?


Un debug siempre devuelve
ok: [127.0.0.1] => {
  "msg": "Hello world!"
}
Mirar que lo estamos poniendo bien:
- debug: var=VARIABLE


ERROR: Syntax Error while loading YAML script
Mirar que no tengamos un comando o variable donde dentro haya la cadena ': '
Quitar el espacio en blanco soluciona el problema.
