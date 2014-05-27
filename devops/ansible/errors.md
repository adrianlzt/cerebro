Podemos ignorar un error de una task concreto:

- name: move nrpe.d to nrpe.manual
  copy: src=/etc/nrpe.d/ dest=/etc/nrpe.manual/
  ignore_errors: True



Se queda parada la ejecucción y estamos usando sudo.
Le estamos pasando la pass via -e, fichero hosts o prompt (-K) ?
