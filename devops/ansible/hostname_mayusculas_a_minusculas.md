ansible all -s -m shell -a "sed -i -r 's/(HOSTNAME=)(.*)/\1\L\2/' /etc/sysconfig/network"

ansible all -s -m shell -a "a=\$(hostname);sed -i -r 's/('\$a')/\L\1/' /etc/hosts"

ansible all -s -m shell -a "echo \$(hostname | tr '[:upper:]' '[:lower:]') | xargs -I {} hostname {}"

ansible all -s -m shell -a "service network restart"
