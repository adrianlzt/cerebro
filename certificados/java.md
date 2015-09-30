Ver certificados

cd /usr/lib/jvm/java-7-openjdk/jre/lib/security
cacerts -> /etc/ssl/certs/java/cacerts
keytool -list -keystore cacerts | less

Pass por defecto del fichero cacerts: "changeit"

Añadir certificado:
sudo keytool -import -alias ALIAS -keystore cacerts -storepass changeit -file fichero.crt
