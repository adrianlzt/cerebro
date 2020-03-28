x509:
  Donde va la información del certificado (estructura).

Generas un par de claves (pública,privada).
Generas un CSR con la pública
CSR: certificate signing request, contiene un X509 con la clave pública que se quiere firmar

La autoridad certificadora coge el CSR y lo firma con su clave privada, y te devuelve un certificado de identidad (puede ser .pem o .der).
La clave pública de la autoridad, si es una conocida, ya estará insertada en los navegadores, si no, nos enviará también su clave pública.

PKCS
  #8
  #11
  #12: más nuevo y más común. Almacen protegido por contraseña, donde va la clave pública y puede ir la privada



KEY – Private key (Restrictive permissions should be set on this)
CSR – Certificate Request (This will be signed by our CA in order to create the server certificates. Afterwards it is not needed and can be deleted)
CRT – Certificate (This can be publicly distributed)
PEM – We will use this extension for files that contain both the Key and the server Certificate (Some servers need this). Permissions should be restrictive on these files.
CRL – Certificate Revokation List (This can be publicly distributed)



openssl genrsa -out cert.key 2048
openssl req -new -key cert.key -out cert.csr
