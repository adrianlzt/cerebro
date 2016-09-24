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


msg: Aborting, target uses selinux but python bindings (libselinux-python) aren't installed!
Instalar libselinux-python en la máquina cliente.


check mode not supported for shell
Quitar el -C de los parametros (es el parametro para no hacer operaciones en el host atacado)


La conexión se queda colgada cuando ejecuta el sshpass (visto con -vvvv).
Mirar si tenemos el sftp instalado (openssh-clients)
# pwd
/etc/ssh
# grep sftp *
sshd_config:Subsystemsftp/usr/libexec/openssh/sftp-server


ValueError: No JSON object could be decoded
El inventario dinámico no está funcionando


FATAL: no hosts matched or all hosts have already failed -- aborting
Con la version 1.9.3, si el nombre del host tiene ":" lo ignora
