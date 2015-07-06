http://www.g-loaded.eu/2005/11/10/be-your-own-ca/

Hacer todo como root, si no, falla al firmar el certificado.


# Estructura básica
mkdir -m 0755 /etc/pki_jungle/{myCA,myCA/private,myCA/certs,myCA/newcerts,myCA/crl}
cp /etc/pki/tls/openssl.cnf /etc/pki_jungle/myCA/openssl.my.cnf
chmod 0600 /etc/pki_jungle/myCA/openssl.my.cnf
touch /etc/pki_jungle/myCA/index.txt
echo '01' > /etc/pki_jungle/myCA/serial


# Crear CA
cd /etc/pki_jungle/myCA/
openssl req -config openssl.my.cnf -new -x509 -extensions v3_ca -keyout private/myca.key -out certs/myca.crt -days 1825
  Tenemos que definir un password >4 caracteres (valor tonto: 1234)
  También tendremos que definir un "Common Name"
  Crea:
    certs/myca.crt  <- este deberemos instarlo en los navegadores para que la acepten como autoridad certificadora. Aparecerá como "Default Company"
    private/myca.key

chmod 0400 /etc/pki_jungle/myCA/private/myca.key

sed -i s#'/etc/pki/CA'#'.'# /etc/pki_jungle/myCA/openssl.my.cnf
sed -i  s/'\(^certificate.*\/\).*'/'\1certs\/myca.crt'/ /etc/pki_jungle/myCA/openssl.my.cnf
sed -i s#'private/cakey.pem'#'private/myca.key'# /etc/pki_jungle/myCA/openssl.my.cnf


# Firmar un csr
openssl ca -config /etc/pki_jungle/myCA/openssl.my.cnf -policy policy_anything -out certs/apache_prueba.crt -infiles /home/vagrant/apache.prueba/self-ssl.csr
  nos pedirá la pass que pusimos al crear la CA
  se genera certs/apache_prueba.crt que es el fichero que daremos al que haya pedido la firma
