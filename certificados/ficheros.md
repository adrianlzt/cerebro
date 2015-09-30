http://bsdsupport.org/q-how-do-i-use-openssl-to-encrypt-files/

# Simetrico
openssl aes-256-cbc -salt -a -e -in plaintext.txt -out encrypted.txt

openssl aes-256-cbc -salt -a -d -in encrypted.txt -out plaintext.txt



# Asimétrico
Generar claves:
openssl genrsa -out private.key 4096
openssl rsa -in private.key -pubout -out public.key

Encriptar:
openssl rsautl -encrypt -pubin -inkey public.key -in plaintext.txt -out encrypted.txt

Desencriptar:
openssl rsautl -decrypt -inkey private.key -in encrypted.txt -out plaintext.txt

