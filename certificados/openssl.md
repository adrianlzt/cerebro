# cliente basico
man s_client

openssl s_client -connect example.com:443



# HowTo
http://www.madboa.com/geek/openssl/

The openssl application that ships with the OpenSSL libraries can perform a wide range of crypto operations. This HOWTO provides some cookbook-style recipes for using it.


# Encriptar un fichero
openssl des3 -salt -in "test" -out "test.des3"
  nos pregunta la contraseña via prompt

Encriptar pasando la pass por parametro y generando un fichero base64
openssl des3 -salt -k prueba -a -in "test" -out "test.des3"

Pasando por stdin
echo "texto" | openssl des3 -salt -k prueba -a -out "test.des3"

# Desencriptar
openssl des3 -d -salt -in "test.des3" -out "test"

Pasando pass por parametro y leyendo base64
openssl des3 -d -salt -k prueba -a -in "test" -out "test"
