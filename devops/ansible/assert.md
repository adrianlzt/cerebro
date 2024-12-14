Verificar que ciertas variables son las esperadas.

Podemos ponerlo como primer paso en un rol.

Ejemplo:
<https://github.com/robertdebock/ansible-role-vault/blob/4.7.1/tasks/assert.yml>
<https://github.com/tonipamies/ansible-role-nodeansible/blob/a39b055e441fc3af4a8bec07770b84ba39916276/tasks/asserts.yml#L8>

- name: test if vault_disable_cache is set correctly
  ansible.builtin.assert:
  that: - vault_disable_cache is boolean
  quiet: yes
  when:
  - vault_disable_cache is defined

Comprobar que es una lista:

```yaml
- name: Assert if list
  assert:
    that: ( mylist is defined ) and ( mylist | type_debug == "list" )

- name: Assert if list
  assert:
    that: >
      ( mylist is defined ) and ( mylist is not mapping )
      and ( mylist is iterable ) and ( mylist is not string )
```

Comprobar que es un diccionario:

```yaml
- name: Assert if dictionary
  assert:
    that: ( mydict is defined ) and ( mydict | type_debug == "dict" )

- name: Assert if dictionary
  assert:
    that: ( mydict is defined ) and ( mydict is mapping )
```
