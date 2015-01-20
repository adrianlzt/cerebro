https://cipherli.st/
Strong Ciphers for Apache, nginx and Lighttpd

ssl.honor-cipher-order = "enable"
ssl.cipher-list = "AES128+EECDH:AES128+EDH"
ssl.use-compression = "disable"
setenv.add-response-header = (
    "Strict-Transport-Security" => "max-age=63072000; includeSubDomains",
    "X-Frame-Options" => "DENY",
    "X-Content-Type-Options" => "nosniff"
)
ssl.use-sslv2 = "disable"
ssl.use-sslv3 = "disable"
