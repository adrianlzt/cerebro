Parámetros para ssh
ansible.cfg

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

