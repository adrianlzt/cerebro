Parámetros para ssh
ansible.cfg

transport=ssh
más rápido (que paramiko)

pipelining
optimización para lanzar cosas en paralelo
  

[ssh_connection]
ssh_args = -o ForwardAgent=yes -o UserKnownHostsFile=/dev/null -o BatchMode=yes -o StrictHostKeyChecking=no -F ssh.cfg -q
scp_if_ssh = True


Usando una máquina de salto:

Host 172.*
    ServerAliveInterval    60
    TCPKeepAlive           yes
    StrictHostKeyChecking  no
    ProxyCommand           ssh -o UserKnownHostsFile=/dev/null -o BatchMode=yes -o StrictHostKeyChecking=no -A cloud-user@10.0.0.2 -W %h:%p
    User                   cloud-user


Host *
    User                   cloud-user
    ProxyCommand           none
    BatchMode              yes
    StrictHostKeyChecking  no
    PasswordAuthentication no


Modulo known_hosts: manages the ssh known_hosts file


# ProxyCommand
http://docs.ansible.com/ansible/faq.html#how-do-i-configure-a-jump-host-to-access-servers-that-i-have-no-direct-access-to
ansible_ssh_common_args: '-o ProxyCommand="ssh -W %h:%p -q user@gateway.example.com"'

