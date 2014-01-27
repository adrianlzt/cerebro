socat openssl-listen:443,bind=0.0.0.0,fork,reuseaddr,verify=0,cert=server.pem echo
Esto nos hace echo de todo lo que escribamos.

socat openssl-listen:443,bind=0.0.0.0,fork,reuseaddr,verify=0,cert=server.pem stdio
Esto nos permite responder lo que queramos.

El certificado .pem debe tener la clave mas el certificado (cat server.key server.crt > server.pem)
