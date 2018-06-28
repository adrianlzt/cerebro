https://docs.ansible.com/ansible/latest/modules/win_chocolatey_module.html

- name: Install git
  win_chocolatey:
    name: git
    state: present
