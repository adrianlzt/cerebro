http://docs.ansible.com/debug_module.html
ansible-playbook -vvvv  <- para poder ver los mensajes de debug

- debug: msg="System {{ inventory_hostname }} has uuid {{ ansible_product_uuid }}"

- shell: /usr/bin/uptime
  register: result

- debug: var=result

- debug: var=hostvars[groups['nfs'][0]].ansible_eth0.ipv4.address

O también:
debug: msg="{{ puppet.stdout }}"


Podemos poner:
- pause:
Para para la ejecución tras cada task a la espera de un enter.

ansible-playbook --step


# Sacar script ejecutado en la máquina remota
cd /home/USUARIO/.ansible/
while true; do sleep 0.2; find . -type f -exec cp {} /tmp/ \;; done
