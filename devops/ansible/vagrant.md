http://docs.vagrantup.com/v2/provisioning/ansible.html
https://www.vagrantup.com/docs/provisioning/ansible_intro.html

Vagrant.configure("2") do |config|
  config.vm.box = "chef/centos-6.5"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.become = true
  end
end


En el mismo directorio del Vagrantfile
playbook.yml:
---
- hosts: all
  tasks:
    - name: ensure ntpd is at the latest version
      yum: pkg=ntp state=latest
      notify:
      - restart ntpd
  handlers:
    - name: restart ntpd
      service: name=ntpd state=restarted


Estructura de directorios mejor:
|-- Vagrantfile
|-- provisioning
|   |-- group_vars
|           |-- all
|   |-- roles
|           |-- bar
|           |-- foo
|   |-- playbook.yml

mkdir -p provisioning/{group_vars,roles}

Usar con:
ansible.playbook = "provisioning/playbook.yml"


Al hacer vagrant up, nos ejecutará el provision después.
Si queremos ejecutarlo a mano:
vagrant provision




Ejecutar ansible contra una maquina vagrant provisionada con ansible
$ ansible-playbook -i .vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory --private-key=~/.vagrant.d/insecure_private_key -u vagrant playbook.yml

El inventario que genera es algo tipo:
machine ansible_ssh_host=127.0.0.1 ansible_ssh_port=2222

