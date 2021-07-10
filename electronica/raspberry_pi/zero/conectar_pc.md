http://blog.gbaman.info/?p=699
http://www.recantha.co.uk/blog/?p=15566

Como configurar el SO para poder conectarla a un pc y acceder via ssh.



1.- Flashea Raspbian (os.md)
2.- Montar la microsd y en la particion boot:
    echo "dtoverlay=dwc2" >> config.txt
    touch ssh
    vi cmdline.txt
    Insert 'modules-load=dwc2,g_ether' after 'rootwait'
3.- Desmontar la microsd y meterla en la raspizero
4.- Conectar la raspizero al pc con un cable microusb (puerto USB de la raspizero)

Podemos conectar un teclado con un adaptador OTG

Nos aparecerá un adaptador ethernet nuevo en nuestro pc.
Para buscar la ip de la raspizero:
nmap -sP 169.254.10.54/16


Por defecto:
ssh pi@IP
password: raspberry
