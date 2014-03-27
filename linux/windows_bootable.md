http://askubuntu.com/questions/289559/how-to-create-a-windows-8-bootable-usb-stick-with-ubuntu

sudo add-apt-repository ppa:colingille/freshlight
sudo apt-get update
sudo apt-get install winusb

sudo winusb --format Documentos/SW_DVD5_SA_Win_Ent_8.1_64BIT_Spanish_MLF_X18-96760.iso /dev/sdb1

El fichero debe ser .iso, en minúsculas.


Más sencillo
sudo winusbgui
