https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/

Aplicación para crear certificados https para nuestro localhost

yay mkcert

mkcert -install
  genera CA en ~/.local/share/mkcert
  la instala en el SO y en firefox/chrome

mkcert 127.0.0.1
  crear cert para 127.0.0.1 firmado por la CA

Los subject names los mete como alternative names
