http://www.insanelymac.com/forum/topic/293168-guide-how-to-make-a-bootable-os-x-109-mavericks-usb-install-drive-on-linux/

Formatear un pendrive con HFS+

Install OS X Mavericks.app/Contents/SharedSupport
$ 7z x InstallESD.dmg
$ cd InstallMacOSX.pkg/
$ 7z x InstallESD.dmg (otra vez, se llama igual el fichero)
# mkdir /mnt/osx /mnt/base
# mount -o loop 3.hfs /mnt/osx/
... seguir el manual...

7z x -so /media/adrian/osx/System/Installation/Packages/BaseSystemBinaries.pkg | bunzip2 | cpio -i
...
sudo dd bs=446 count=1 if=/tmp/i386/boot0 of=/dev/sdb
...

