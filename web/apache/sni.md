http://www.rackspace.com/knowledge_center/article/serving-secure-sites-with-sni-on-apache


Donde tengamos
Listen 443

Añadimos
NameVirtualHost *:443


Creamos un segundo virtualhost ssl (suponiendo que ya tenemos el /etc/httpd/conf.d/ssl.conf que viene por defecto)
Este segundo virtualhost tendrá el otro certificado con CN = ServerName


<VirtualHost *:443>
  ServerName apache2.prueba
  ErrorLog logs/ssl_error_log
  TransferLog logs/ssl_access_log
  SSLEngine on
  SSLProtocol all -SSLv2
  SSLCipherSuite ALL:!ADH:!EXPORT:!SSLv2:RC4+RSA:+HIGH:+MEDIUM:+LOW
  SSLCertificateFile /home/vagrant/apache2.prueba/apache2_prueba.crt
  SSLCertificateKeyFile /home/vagrant/apache2.prueba/self-ssl.key
  CustomLog logs/ssl_request_log \
          "%t %h %{SSL_PROTOCOL}x %{SSL_CIPHER}x \"%r\" %b"
</VirtualHost>

