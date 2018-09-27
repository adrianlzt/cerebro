https://www.virtualbox.org/manual/ch08.html

https://www.perkin.org.uk/posts/create-virtualbox-vm-from-the-command-line.html

Crear una VM con un HDD y montarle una iso como DVD
VM='Alien_OSSIM'
VBoxManage createhd --filename $VM.vdi --size 32768
VBoxManage list ostypes
VBoxManage createvm --name $VM --ostype Debian_64 --register
VBoxManage storagectl $VM --name "SATA Controller" --add sata --controller IntelAHCI
VBoxManage storageattach $VM --storagectl "SATA Controller" --port 0 --device 0 --type hdd --medium $VM.vdi
VBoxManage storagectl $VM --name "IDE Controller" --add ide
VBoxManage storageattach $VM --storagectl "IDE Controller" --port 0 --device 0 --type dvddrive --medium AlienVault_OSSIM_64bits.iso
VBoxManage modifyvm $VM --ioapic on
VBoxManage modifyvm $VM --boot1 dvd --boot2 disk --boot3 none --boot4 none
VBoxManage modifyvm $VM --memory 2048 --vram 128

Elegir como queremos conectar la red:
Crear la interfaz (ip de la misma red que alguna de las interfaces de host):
  brctl addbr vmtestbr1
  ifconfig vmtestbr1 192.168.222.1  netmask 255.255.255.0 up
  desaparece si se reinicia la maquina
VBoxManage modifyvm $VM --nic1 bridged --bridgeadapter1 vmtestbr1
VBoxManage modifyvm $VM --nic1 nat

VBoxHeadless -s $VM
VBoxHeadless -s $VM -v on
  arrancarla con RDP

Quitar iso:
VBoxManage storageattach $VM --storagectl "IDE Controller" --port 0 --device 0 --type dvddrive --medium none

Hacer snapshots:
VBoxManage snapshot $VM take <name of snapshot>
VBoxManage snapshot $VM restore <name of snapshot>

