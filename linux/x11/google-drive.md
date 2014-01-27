Insync -> de pago, 15$

SyncDrive: http://www.noobslab.com/2013/09/syncdrive-google-drive-available-for.html
sudo add-apt-repository ppa:noobslab/pear-apps
sudo apt-get update
sudo apt-get install syncdrive

Es mejor Insync.
Esta app no te sincroniza ficheros de google. Insync te crea enlaces a esos documentos.
Tambien hay ciertos ficheros que no sincroniza, comparado con Insync.


Comparar ficheros:
diff -r Documentos/pepe@gmail.com/ SyncDrive/ |grep -v -e gddoc -e gdsheet -e gdslides -e gdtable -e gdlink |less
