Vagrantfile se genera leyendo, en este orden.
1. el interno de vagrant
2. el que viene empaquetado con la box
3. el que podamos tener bajo ~/.vagrant.d
4. el que tengamos en el directorio actual (y si aquí no encuentra, escalando hacia arriba por los directorios)

Por lo general los parametros override los antiguos (4 preferencia sobre el resto). Aunque en algunos casos pueden ser aditivos, como al definir redes.

Settings de la máquina: http://docs.vagrantup.com/v2/vagrantfile/machine_settings.html


Multimáquina:
Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: "echo Hello"

  config.vm.define "web" do |web|
    web.vm.box = "apache"
  end

  config.vm.define "db" do |db|
    db.vm.box = "mysql"
  end
end

Usar private networking para multimachine (también public valdría)


vagrant up -> levanta todas
vagrant up db
vagrant up /slave[0-9]/ -> levantaría las slave1, slave2,..., slave9

También se puede especificar una máquina por defecto sobre la que actuarían los comandos si no se define una en particular:
config.vm.define "web", primary: true do |web|


## Condicionales ##

if 1 == 1
  puts "prueba"
  exit
end


## Configuración ##

require 'pp'

pp config
