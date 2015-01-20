https://wiki.mozilla.org/Security/Server_Side_TLS

https://cipherli.st/
Strong Ciphers for Apache, nginx and Lighttpd

SSLCipherSuite AES128+EECDH:AES128+EDH
SSLProtocol All -SSLv2 -SSLv3
SSLHonorCipherOrder On
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
# Requires Apache >= 2.4
SSLCompression off 
SSLUseStapling on 
SSLStaplingCache "shmcb:logs/stapling-cache(150000)"
