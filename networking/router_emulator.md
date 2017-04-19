https://www.gns3.com/

Emulador gráfico de redes.
Parece que para emular routers cisco hace falta una imagen de IOS

yaourt -S gns3-gui gns3-server


        To enable and start gns3-server execute the following,
        replacing 'USER' with your username:

                systemctl enable gns3-server@USER
                systemctl start gns3-server@USER
Dependencias opcionales para gns3-server
    dynamips: Cisco router emulator. [instalado]
    gns3-gui: graphical user interface for GNS3 server. [instalado]
    vboxwrapper: VirtualBox wrapper for GNS3.
    iouyap: Bridge IOU to UDP, TAP and Ethernet.
    qemu: Used by GNS3 to run Cisco ASA, PIX and IDS. [instalado]
    vpcs: Simple PC emulation for basic network operations.
    ubridge: Bridge for UDP tunnels, Ethernet, TAP and VMnet interfaces.
