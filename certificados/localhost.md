https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/

Aplicación para crear certificados https para nuestro localhost

yay mkcert

mkcert -install
  genera CA en ~/.local/share/mkcert
  la instala en el SO y en firefox/chrome

mkcert 127.0.0.1
  crear cert para 127.0.0.1 firmado por la CA

Los subject names los mete como alternative names


mkcert -cert-file client.pem -key-file client.key -client domain
  crea certificados cliente



mkdir -p certs/{ca,server,client}
CAROOT=$PWD/certs/ca mkcert -cert-file certs/server/server.pem -key-file certs/server/server.key 127.0.0.1 ::1 localhost
CAROOT=$PWD/certs/ca mkcert -client -cert-file certs/client/client.pem -key-file certs/client/client.key nameUser1
En el server usar: ca=certs/ca/rootCA.pem cert=certs/server/server.pem, key=certs/server/server.key

curl https://127.0.0.1:4000 -v --cert certs/client/client.pem --key certs/client/client.key --cacert certs/ca/rootCA.pem

