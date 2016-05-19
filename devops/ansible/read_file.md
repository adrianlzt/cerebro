http://docs.ansible.com/ansible/playbooks_lookups.html#intro-to-lookups-getting-file-contents

---
- hosts: all
  vars:
     contents: "{{ lookup('file', '/etc/foo.txt') }}"

  tasks:

     - debug: msg="the value of foo.txt is {{ contents }}"
