http://docs.ansible.com/ansible/authorized_key_module.html

- name: Set authorized key took from file
  authorized_key: user=charlie state=present key="{{ lookup('file', '/home/charlie/.ssh/id_rsa.pub') }}"
