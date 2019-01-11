https://github.com/SecureAuthCorp/SAP-Dissection-plug-in-for-Wireshark

Plugin para poder leer el protocolo binario de SAP.
Entre ellos el SAP's RFC usado por CCMS.

He bajado el binario de las releases de github y puesto en:
/usr/lib/wireshark/plugins/2.6/epan/sap-v0.5.2-linux-x86-64.so

Me requería la lib libwireshark.so.11, pero yo tengo la .10.
Haciendo un link ha funcionado:
cd /usr/lib
sudo ln -s libwireshark.so.10.1.5 libwireshark.so.11
