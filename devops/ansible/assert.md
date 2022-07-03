Verificar que ciertas variables son las esperadas.

Podemos ponerlo como primer paso en un rol.

Ejemplo:
https://github.com/robertdebock/ansible-role-vault/blob/4.7.1/tasks/assert.yml

- name: test if vault_disable_cache is set correctly
  ansible.builtin.assert:
    that:
      - vault_disable_cache is boolean
    quiet: yes
  when:
    - vault_disable_cache is defined
