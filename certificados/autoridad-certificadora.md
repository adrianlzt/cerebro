mirar lets_encrypt.md

# StarSSL
Nos da certificado simplemente demostrando que el dominio es tuyo.
Aceptado todos los certificados.
Los wildcard los cobran.
Para que se ponga el icono verde de los navegadores también cobran.


# easy-rsa
Para crear una CA de forma sencilla
yum install -y easy-rsa
cd /usr/share/easy-rsa/2.0
editamos el fichero vars (modificamos KEY_COUNTRY KEY_PROVINCE KEY_CITY KEY_ORG KEY_EMAIL KEY_OU)
source vars
./clean-all
./build-ca

En keys/ tendremos el certificado y clave de la ca

Creamos un cert para un servidor
./build-key-server nombremaquina

Ahora un certificado para cliente:
./build-key adrian

Necesitamos tambien generar los paramestros Diffie Hellman:
./build-dh

El servidor normalmente neceistará los ficheros:
ca.crt, ca.key (secreto), dh*.pem NOMBRESERVER.crt NOMBRESERVER.key (secreto)

Los clientes necesitarán:
ca.crt, client1.crt, client1.key (secreto)






http://www.g-loaded.eu/2005/11/10/be-your-own-ca/

Hacer todo como root, si no, falla al firmar el certificado.


# Estructura básica
mkdir -p -m 0755 /etc/pki_jungle/{myCA,myCA/private,myCA/certs,myCA/newcerts,myCA/crl}
cp /etc/ssl/openssl.cnf /etc/pki_jungle/myCA/openssl.my.cnf
chmod 0600 /etc/pki_jungle/myCA/openssl.my.cnf
touch /etc/pki_jungle/myCA/index.txt
echo '01' > /etc/pki_jungle/myCA/serial

en vez de /etc/ssl puede ser /etc/pki/tls


# Crear CA
cd /etc/pki_jungle/myCA/
openssl req -config openssl.my.cnf -new -x509 -extensions v3_ca -keyout private/myca.key -out certs/myca.crt -days 1825
  Tenemos que definir un password >4 caracteres (valor tonto: 1234)
  También tendremos que definir un "Common Name"
  Crea:
    certs/myca.crt  <- este deberemos instarlo en los navegadores para que la acepten como autoridad certificadora. Aparecerá como "Default Company"
    private/myca.key

chmod 0400 /etc/pki_jungle/myCA/private/myca.key

Debemos editar /etc/pki_jungle/myCA/openssl.my.cnf para definir el dir de la seccion [CA_default] a /etc/pki_jungle/myCA/

Estos comando creo que son para OS redhat/centos:
sed -i s#'/etc/pki/CA'#'.'# /etc/pki_jungle/myCA/openssl.my.cnf
sed -i  s/'\(^certificate.*\/\).*'/'\1certs\/myca.crt'/ /etc/pki_jungle/myCA/openssl.my.cnf
sed -i s#'private/cakey.pem'#'private/myca.key'# /etc/pki_jungle/myCA/openssl.my.cnf


# Firmar un csr
openssl ca -config /etc/pki_jungle/myCA/openssl.my.cnf -policy policy_anything -out certs/apache_prueba.crt -infiles /home/vagrant/apache.prueba/self-ssl.csr
  nos pedirá la pass que pusimos al crear la CA
  se genera certs/apache_prueba.crt que es el fichero que daremos al que haya pedido la firma
