https://cipherli.st/
Strong Ciphers for Apache, nginx and Lighttpd

ssl_ciphers "AES128+EECDH:AES128+EDH";
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
ssl_stapling on; # Requires nginx >= 1.3.7
ssl_stapling_verify on; # Requires nginx => 1.3.7
resolver $DNS-IP-1 $DNS-IP-2 valid=300s;
resolver_timeout 5s;
