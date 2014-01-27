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
