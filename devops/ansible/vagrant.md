http://docs.vagrantup.com/v2/provisioning/ansible.html

Vagrant.configure("2") do |config|
  config.vm.box = "chef/centos-6.5"
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.sudo = true
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


Si intento hacer un playbook muy sencillo con una task que genere un fichero no lo genera :?


Playbook con roles, los leerá de .ansible/roles
---
- hosts: all
  roles:
    - nombre.del.rol
