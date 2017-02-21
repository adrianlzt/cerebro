Para comprobar que un certificado lo ha firmado una CA determinada:

certificate_verify.py -c certificado_servidor.pem -a ca.pem -a ca_intermedia.pem

Los ficheos deben ser tipo pem (X509, codificación base64)

Pueden haber varios certificados concatenados. "ca.pem" por ejemplo puede tener dentro el certificado de la ca más un certificado intermedio.


Si el certificado del servidor lleva alguna autoridad certificadora adjunto, tendremos que separarlo y pasarlo con el parámetro -a



# Openssl
http://www.openssl.org/docs/apps/verify.html
openssl verify -verbose -CAfile Certificate-Authority.crt user.pem 

Hay que tener cuidado con el comando openssl, porque puede coger los certificados del SO
