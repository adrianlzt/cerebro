https://github.com/kusnier/vagrant-persistent-storage

vagrant plugin install vagrant-persistent-storage



Crea un disco /dev/sdb:

The following options will create a persistent storage with 5000 MB, named mysql, mounted on /var/lib/mysql, in a volume group called 'vagrant'

config.persistent_storage.enabled = true
config.persistent_storage.location = "~/development/sourcehdd.vdi"
config.persistent_storage.size = 5000
config.persistent_storage.mountname = 'mysql'
config.persistent_storage.filesystem = 'ext4'
config.persistent_storage.mountpoint = '/var/lib/mysql'
config.persistent_storage.volgroupname = 'myvolgroup'


ERROR:
 INFO subprocess: Starting process: ["/usr/bin/VBoxManage", "storagectl", "5c4c1ebf-6b08-4c4a-a870-0a6d167f6f77", "--name", "SATA Controller", "--hostiocache", "on"]
 DEBUG subprocess: Selecting on IO
 DEBUG subprocess: stderr: VBoxManage: error: Could not find a storage controller named 'SATA Controller'
 VBoxManage: error: Details: code VBOX_E_OBJECT_NOT_FOUND (0x80bb0001), component SessionMachine, interface IMachine, callee nsISupports
 VBoxManage: error: Context: "GetStorageControllerByName(Bstr(pszCtl).raw(), ctl.asOutParam())" at line 1151 of file VBoxManageStorageController.cpp
 DEBUG subprocess: stderr: VBoxManage: error: Couldn't find the controller with the name: 'SATA Controller'
 DEBUG subprocess: Waiting for process to exit. Remaining to timeout: 32000
 DEBUG subprocess: Exit status: 1
  INFO retryable: Retryable exception raised: #<Vagrant::Errors::VBoxManageError: There was an error while executing `VBoxManage`, a CLI used by Vagrant
  for controlling VirtualBox. The command and stderr is shown below.

  Command: ["storagectl", "5c4c1ebf-6b08-4c4a-a870-0a6d167f6f77", "--name", "SATA Controller", "--hostiocache", "on"]





Si queremos varios discos tendremos que llamar directamente a virtualbox, ejemplo:
https://github.com/kusnier/vagrant-persistent-storage/issues/22
Un disco (ver issue para dos discos)
/root/kubernetes/demo
  config.vm.provider "virtualbox" do |vb|
    vb.customize [
      'createmedium', 'disk',
      '--filename', "/root/sdb.vdi",
      '--format', 'VDI',
      '--size', 50 * 1024]
    vb.customize [
      'storageattach', :id,
      '--storagectl', 'SATAController',
      '--port', 1,
      '--device', 0,
      '--type', 'hdd',
      '--medium', "/root/sdb.vdi"]
  end

Si falla probar con --storagectl IDE, o "SATA Controller" o SCSI
Podemos ver que controlador soporta nuestra box:
cat ~/.vagrant.d/boxes/centos-VAGRANTSLASH-7/1809.01/virtualbox/box.ovf | egrep -oi "StorageController.{100}"

