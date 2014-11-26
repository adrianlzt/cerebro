Parámetros para ssh
ansible.cfg

[ssh_connection]
ssh_args = -o ForwardAgent=yes -o UserKnownHostsFile=/dev/null -o BatchMode=yes -o StrictHostKeyChecking=no -F ssh.cfg -q
scp_if_ssh = True

