Podemos aplicar los mismos playbooks sobre distintos entornos cambiando los hosts donde deben aplicarse:

/usr/bin/ansible-playbook -i /etc/ansible/hosts-dev /etc/ansible/playbooks/site.yml
/usr/bin/ansible-playbook -i /etc/ansible/hosts-pre /etc/ansible/playbooks/site.yml
