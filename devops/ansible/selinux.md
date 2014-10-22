Si la máquina cliente tiene selinux, meter al comienzo del main.yaml del role:

- include: selinux.yml


selinux.yml:
- name: be sure libselinux-python are installed
  yum: >
    name=libselinux-python
    state=present

