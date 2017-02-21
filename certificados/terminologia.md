pxf: llave + certificado unidos
pem / cer: certificados
key: llave

X509: estandar que define certificados
Estos certificados pueden tener dos encodings:
  - der (ASN.1): binario. Suelen tener la extension .der, .cer o .crt
  - pem: ascii, comiezan por "--- BEGIN". Suelen tener la extension .cer o .crt

Los certificandos siempre almacenan claves públicas

PKCS#12, container que puede tener certificados X509 y las claves privadas correspondientes. Opcionalmente también puede tener la cadena de certificados de las CAs que firman el certificado.
Son ficheros binarios. Extension .pfx o .p12

PKCS#7/P7B: certificado y su cadena. Extensiones: p7b o p7c
Ficheros codificados en der (binario) o pem (base64)

PKCS#8, claves públicas y privadas. Pueden estar codificadas con DER o PEM. Tienen la extenion .key
