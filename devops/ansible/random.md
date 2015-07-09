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
