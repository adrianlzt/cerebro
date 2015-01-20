Pasos de como funciona un carga por PXE: http://docs.oracle.com/cd/E24628_01/em.121/e27046/appdx_pxeboot.htm

Target Machine (either bare metal or with boot sector removed) is booted.

The Network Interface Card (NIC) of the machine triggers a DHCP request.

DHCP server intercepts the request and responds with standard information (IP, subnet mask, gateway, DNS etc.). In addition, it provides information about the location of a TFTP server and boot image (pxelinux.0).

When the client receives this information, it contacts the TFTP server for obtaining the boot image.

TFTP server sends the boot image (pxelinux.0), and the client executes it.

By default, the boot image searches the pxelinux.cfg directory on TFTP server for boot configuration files on the TFTP server using the following approach:

First, it searches for the boot configuration file that is named according to the MAC address represented in lower case hexadecimal digits with dash separators. For example, for the MAC Address "88:99:AA:BB:CC:DD", it searches for the file 01-88-99-aa-bb-cc-dd.

Then, it searches for the configuration file using the IP address (of the machine that is being booted) in upper case hexadecimal digits. For example, for the IP Address "192.0.2.91", it searches for the file "C000025B".

If that file is not found, it removes one hexadecimal digit from the end and tries again. However, if the search is still not successful, it finally looks for a file named "default" (in lower case).

For example, if the boot file name is /tftpboot/pxelinux.0, the Ethernet MAC address is 88:99:AA:BB:CC:DD, and the IP address 192.0.2.91, the boot image looks for file names in the following order:
/tftpboot/pxelinux.cfg/01-88-99-aa-bb-cc-dd
/tftpboot/pxelinux.cfg/C000025B
/tftpboot/pxelinux.cfg/C000025
/tftpboot/pxelinux.cfg/C00002
/tftpboot/pxelinux.cfg/C0000
/tftpboot/pxelinux.cfg/C000
/tftpboot/pxelinux.cfg/C00
/tftpboot/pxelinux.cfg/C0
/tftpboot/pxelinux.cfg/C
The client downloads all the files it needs (kernel and root file system), and then loads them.

Request via TFTP a small set of complementary files in order to get running a minimalistic OS executive (i.e. WindowsPE, or a basic Linux kernel+initrd)
When the small OS executive is alive it loads its own fully capable network drivers, a full TCP/IP stack, and the rest of transfers for booting or installing a full OS are performed not by TFTP but at this point using more robust transfer protocols like HTTP, CIFS, NFS, etc.
