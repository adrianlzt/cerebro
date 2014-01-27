vboxheadless -s nombre
vboxmanage showvminfo testPace-nodo1 | grep VRDE  <--- apuntar el numero de puerto
rdesktop -N localhost:3389


En los parametros debería aparecer la ip
VBoxManage guestproperty enumerate <vmname>


Si tenemos problemas puede ser que nos falte el extension pack
vboxmanage extpack install Oracle_VM_VirtualBox_Extension_Pack-4.2.12-84980.vbox-extpack
