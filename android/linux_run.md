https://www.linux.com/learn/tutorials/842630-installing-android-apps-on-linux-with-archon

# En el pc
Descargar: http://archon-runtime.github.io/
Instalar como extension del chrome

# Arch - no usar, hacer a mano
yaourt -S archon
428MB

Dependencias opcionales para archon
    archon-exec: wrapper script for launching android apk files
    chromeos-apk: extract and convert android apks into archon apks
    google-chrome: run the archon extension the same as chromium


Copiar la extension a mi home (no se si hace falta, tal vez solo haga falta reiniciar chrome):
cp cp /usr/share/chromium/extensions/fkipmfjmjnlmnbcioncdggeneblaabmd.json ~/.config/chromium/Default/Extensions/

Reiniciar chrome


# En el movil
https://play.google.com/store/apps/details?id=me.bpear.archonpackager
Para generar APKs de apps que tenemos en el telefono.

Creo que esto tambien se puede hacer con la app para google chrome "twerk".
Tendremos que darle el .apk y el nos dará un directorio que será el que importemos con chrome


# Instalar app
Cuando tengamos lo que genera el archon packager lo descrompimos
Luego desde chrome lo ponemos como si fuese una extension
