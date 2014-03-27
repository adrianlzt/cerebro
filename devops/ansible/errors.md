Podemos ignorar un error de una task concreto:

- name: move nrpe.d to nrpe.manual
  copy: src=/etc/nrpe.d/ dest=/etc/nrpe.manual/
  ignore_errors: True

