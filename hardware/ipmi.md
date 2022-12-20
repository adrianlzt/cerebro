Protocolo para interfaces de control "Out of band".

# ipmitool
Herramienta para hablar el protocolo IPMI

Ejemplo haciento una request via LAN:
ipmitool -H 10.0.1.1 -U ADMIN -P CHANGEME chassis status


# ipmicfg-linux
Esta herramienta es particular de Supermicro y nos permite configurar su IPMI desde linux.


# ipmiview
Para conectar a IPMIs y acceso a la consola

La config se guarda en /opt/ipmiview/IPMIView.properties
