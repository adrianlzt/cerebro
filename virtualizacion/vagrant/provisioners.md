http://docs.vagrantup.com/v2/provisioning/index.html

Los 'provisioners' son las disintas formas que hay de provisonar la máquina:
puppet, chef, ansible, cfengine, salt, etc

Uno sencillo es file. Que sube ficheros por scp.


# Shell
config.vm.provision "shell", inline: "echo Hello, World"

Tiene que ir sin identar:
$script = <<SCRIPT
rm /home/vagrant/postinstall.sh
apt-get update -qq -y
SCRIPT
config.vm.provision :shell, :inline => $script

Solo provisionar la shell:
vagrant provision --provision-with shell


# Puppet
Si nos da error de que no encuentra el fqdn, definir el hostname y dominio
config.vm.hostname = "nombre.dominio"


Se puede definir (no se si en la última versión 0.4.1 ya está por defecto)
config.ssh.pty = true
Para lograr una pty, por ejemplo si sudo nos da el error:
sudo: sorry, you must have a tty to run sudo

