http://docs.ansible.com/modules_by_category.html
http://docs.ansible.com/list_of_all_modules.html

Son como los "defined types" de puppet, y se encuentran en:
/usr/share/ansible


Podemos añadir custom modules a un playbook o role:
To use a local module only in certain playbooks:
  store it in a sub-directory called library in the directory that contains the playbook(s)
To use a local module only in a single role:
  store it in a sub-directory called library within that role
