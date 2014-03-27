http://docs.ansible.com/playbooks_intro.html


Should you want to invert the architecture of Ansible, so that nodes check in to a central location, instead of pushing configuration out to them, you can.

Ansible-pull is a small script that will checkout a repo of configuration instructions from git, and then run ansible-playbook against that content.

Assuming you load balance your checkout location, ansible-pull scales essentially infinitely.

Run ansible-pull --help for details.

There’s also a clever playbook (https://github.com/ansible/ansible-examples/blob/master/language_features/ansible_pull.yml) available to configure ansible-pull via a crontab from push mode.
