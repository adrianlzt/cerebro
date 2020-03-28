{{ 100 | random }}


Tres numeros distintos
---
- name: Test random filter
  hosts: localhost
  gather_facts: False
  vars:
    random_number: "{{ 100 | random }}"
  tasks:
    - name: Print the random number
      debug: var=random_number
    - name: Print the random number
      debug: var=random_number
    - name: Print the random number
      debug: var=random_number


Para tener solo un único valor
 - set_fact:
     r: "{{ 100 | random }}"
   run_once: yes


# Generar password
http://docs.ansible.com/ansible/playbooks_lookups.html#the-password-lookup

{{ lookup('password', '/tmp/passwordfile chars=ascii_letters')}}

Lo saca por return value y la almacena en /tmp/passwordfile (en el host que lanza el ansible)

Si el fichero ya existe leera el valor ya generado.
Tambien se puede poner un path relativo a donde estemos ejecutando el playbook (no si si relativo al dir del playbook a al working dir)



Usar el módulo password para generar una cadena aleatoría.
{{ lookup('password', '/dev/null chars=ascii_letters,digits') }}

Otras soluciones más feas (https://stackoverflow.com/questions/30516011/ansible-random-uuid-generation/59087555#59087555):
{{ (999999999999999999999 | random | string + (lookup('pipe', 'date +%s%N'))) | to_uuid() }}
