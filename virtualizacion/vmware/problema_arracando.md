Si nos da este error:
Before you can run VMware, several modules must be compiled and loaded into the running kernel.

Actualizar a la última versión:
https://my.vmware.com/web/vmware/free#desktop_end_user_computing/vmware_player/6_0

Ejecutar
sudo vmware-modconfig --console --install-all


http://askubuntu.com/questions/286326/unable-to-start-vmware-workstation-after-upgrade-to-13-04


sudo apt-get install open-vm-tools open-vm-tools-dev open-vm-dkms open-vm-toolbox open-vm-tools-dev


cd /lib/modules/$(uname -r)/build/include/linux 
sudo ln -s ../generated/utsrelease.h 
sudo ln -s ../generated/autoconf.h 
sudo ln -s ../generated/uapi/linux/version.h
