http://docs.ansible.com/debug_module.html
ansible-playbook -v  <- para poder ver los mensajes de debug

- debug: msg="System {{ inventory_hostname }} has uuid {{ ansible_product_uuid }}"

- shell: /usr/bin/uptime
  register: result

- debug: var=result
