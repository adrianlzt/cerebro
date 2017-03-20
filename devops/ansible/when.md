Si queremos que una tarea se ejecute dependiendo del resultado de otra:

- name: set custom fact to define if we have monitoring
  tags:
    - conf
  template: src=monitoring.json.j2 dest="{{ facter_dir }}/monitoring.json" backup=yes
  register: result


- name: move nrpe.d to nrpe.manual
  tags:
    - conf
  command: cp -pr /etc/nrpe.d/ /etc/nrpe.backup/ creates=/etc/nrpe.backup
  when: result.changed == True


Cuando usamos ansible-playbook con --check --diff el resultado de la tarea condicionada siempre estará como skipping. Solo cuando lo ejecutemos de verdad cogerá el valor adecuado.



    - name: test
      shell: echo | grep "pepe"
      ignore_errors: True
      register: result

    - name: tarea correcta
      command: echo "guay"
      when: result|success

    - name: tarea MAL
      command: echo "guay"
      when: result|failed



Ejecuta si en el stderr de la variable maas_superuser encuentra la cadena 'User does not exist'
when: maas_superuser.stderr.find('User does not exist') != -1



Valor de un "register" cuando no se ejecuta la task por no cumplir el "when":
{
    "XXXX": {
        "changed": false, 
        "skip_reason": "Conditional check failed", 
        "skipped": true
    }
}
