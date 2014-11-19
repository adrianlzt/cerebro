A partir de IceHouse

Desplegar con ansible y heat
https://github.com/openstack/heat-templates/blob/master/hot/software-config/example-templates/example-ansible-template.yaml


  config:
    type: OS::Heat::SoftwareConfig
    properties:
      group: ansible
      inputs:
      - name: foo
      - name: bar
      outputs:
      - name: result
      config:
        get_file: config-scripts/example-ansible-template.ansible

---
- name: Hello Ansible - quick start
  connection: local
  hosts: localhost

  tasks:
    - name: Hello touch_file
      shell: echo {{ foo }} >> /tmp/{{ bar }}

    - name: Hello echo
      shell: echo "The file /tmp/{{ bar }} contains {{ foo }}" >> {{ heat_outputs_path }}.result
