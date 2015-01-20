Shell para controlar el servidor:
http://linux.die.net/man/1/omshell


http://www.syslinux.org/wiki/index.php/PXELINUX#DHCP_Config_-_ISC_dhcpd_options

Ejemplo de configuración para tener pxe:

subnet 192.168.122.0 netmask 255.255.255.0 {
    filename "pxelinux.0";
    option subnet-mask 255.255.255.0;
    option broadcast-address 192.168.122.255;
    option domain-name-servers 192.168.122.136;
    range dynamic-bootp 192.168.122.5 192.168.122.135;
}


Ejemplo configurado por MAAS para server PXE:
option arch code 93 = unsigned integer 16; # RFC4578
option path-prefix code 210 = text; #RFC5071
subnet 192.168.1.0 netmask 255.255.255.0 {
       if option arch = 00:0E {
          filename "pxelinux.0";
          option path-prefix "ppc64el/";
       } elsif option arch = 00:07 {
          filename "bootx64.efi";
       } elsif option arch = 00:0C {
          filename "bootppc64.bin";
       } else {
          filename "pxelinux.0";
       }
       interface "eth1";
       ignore-client-uids true;
       option subnet-mask 255.255.255.0;
       option broadcast-address 192.168.1.255;
       option domain-name-servers 10.0.2.15;
       option domain-name "maas";
       option routers 192.168.1.1;
       option ntp-servers 91.189.94.4;
       range dynamic-bootp 192.168.1.201 192.168.1.220;
       class "PXE" {
          match if substring (option vendor-class-identifier, 0, 3) = "PXE";
          default-lease-time 30;
          max-lease-time 30;
       }
}

omapi-port 7911;
key omapi_key {
    algorithm HMAC-MD5;
    secret "xER8rtyE+Hv4fWYQjfmImtjLMvcfALsuOTxCy7bYQAd+Ph2MowlEQNmDg==";
};
omapi-key omapi_key;

