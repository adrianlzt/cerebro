http://www.packer.io/
http://mitchellh.com/packer
https://github.com/mitchellh/packer

Packer is an open source tool for creating machine images, such as AMIs, VirtualBox images, Vagrant boxes, etc. Packer uses a single portable input format – a template – to generate the images for multiple platforms in parallel, so you can create identical AMIs, VMware machines, etc. all at once. This unlocks a lot of interesting use cases.

Packer is a tool for creating identical machine images for multiple platforms from a single source configuration.

Los ficheros se pueden generar en dos formatos, uno custom y otro JSON, por ejemplo: Packerfile.json
packer build Packerfile.json (parece que se suelen usar nombres tipo builds.pkr.hcl)

Se pueden definir builders y provisioners.


# Convertir json to hcl
packer hcl2_upgrade -with-annotations build.json


# Provisioner

## shell
    provisioner "shell" {
      inline = ["sudo yum install -y python3"]
    }

## ansible
  provisioner "ansible" {
    playbook_file          = "awx_postgres.yml"
    extra_arguments        = [
      "--extra-vars", "include_roles=postgresql",
      "--extra-vars", "entorno=poc",
      "--extra-vars", "ansible_python_interpreter=/usr/bin/python3",
      "--vault-password-file", "vault_pass.txt",
    ]
  }


# Builders

## OpenStack
https://www.packer.io/plugins/builders/openstack

## Vagrant

### Customizar la VM
https://github.com/hashicorp/packer/issues/8239

Template (en los tests, no se donde está la oficial): https://github.com/hashicorp/packer-plugin-vagrant/blob/e3b4ec6848cd391c93f93041d354960565c299e8/builder/vagrant/step_create_vagrantfile.go#L25

source "vagrant" "zabbix_proxy" {
  communicator = "ssh"
  provider     = "virtualbox"
  source_path  = "centos/7"
  template = "Vagrantfile.memory"
}

Ficher Vagrantfile.memory:
Vagrant.configure("2") do |config|
  config.vm.define "source", autostart: false do |source|
        source.vm.box = "{{.SourceBox}}"
        source.vm.provider "virtualbox" do |v|
                v.memory = 1024
                v.cpus = 2
        end
  end
  config.vm.define "output" do |output|
        output.vm.box = "{{.BoxName}}"
        output.vm.box_url = "file://package.box"
        output.vm.provider "virtualbox" do |v|
                v.memory = 1024
                v.cpus = 2
        end
  end
  {{ if ne .SyncedFolder "" -}}
                config.vm.synced_folder "{{.SyncedFolder}}", "/vagrant"
  {{- else -}}
                config.vm.synced_folder ".", "/vagrant", disabled: true
  {{- end}}
end



# cloud-init
https://stackoverflow.com/questions/57564641/openstack-packer-cloud-init

Instalar el paquete, pararlo y borrar los ficheros.



# Debug
Parar en cada step

packer build -debug build.pkr.hcl
