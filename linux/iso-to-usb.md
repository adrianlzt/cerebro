http://askubuntu.com/questions/59551/how-to-burn-a-iso-to-a-usb-device

unetbootin


sudo dd bs=4M if=/path/to/archlinux.iso of=/dev/sdx && sync
