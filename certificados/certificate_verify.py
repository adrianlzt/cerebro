#!/usr/bin/env python
#
# http://www.yothenberg.com/validate-x509-certificate-in-python/
#
# Los certificados deben ser X509 (pem o der)
#
# pip install pyOpenSSL
#

from OpenSSL import crypto
import argparse

def read_cert(cert):
    """
    Obtiene un fichero, lee su contenido y lo convierte a un certificado
    Si es un pem, intenta extraer todos los certificados que haya dentro
    Devuelve un array de certificados
    """
    cert_content = cert.read()

    try:
        certificate = [crypto.load_certificate(crypto.FILETYPE_ASN1, cert_content)]
    except crypto.Error:
        # Fallo al leer certificado tipo DER (ANS1), probamos con PEM
        certificate = []
        for c in multiple_pem(cert_content):
            certificate.append(crypto.load_certificate(crypto.FILETYPE_PEM, c))

    return certificate

def multiple_pem(cert):
    """
    Obtiene el contenido de un fichero .pem
    Devuelve el contenido si solo hay un certificado.
    O los certificados por separado si hubiese varios
    """
    END_CERT = b"-----END CERTIFICATE-----"
    split = cert.split(END_CERT)

    if len(split) <= 2:
        yield cert
    else:
        split.pop() # Quitamos el ultimo elemento del split, que no es un certificado
        for c in split:
            yield c+END_CERT


def verify(cert, trusted_certs):
    store = crypto.X509Store()

    # Obtenemos los certificados del fichero a analizar
    # El primero asumimos que es el que queremos analizar
    # El resto se pasan como autoridades certificadoras
    certificates = read_cert(cert)
    certificate = certificates.pop(0)
    for c in certificates:
        print("Pasando un certificado del fichero a analizar como autoridad certificadora")
        store.add_cert(c)

    # Puede que un trusted_certs este compuesto por varios certs
    for tc in trusted_certs:
        for c in read_cert(tc):
            store.add_cert(c)

    # Create a X590StoreContext with the cert and trusted certs
    # and verify the the chain of trust
    store_ctx = crypto.X509StoreContext(store, certificate)
    # Returns None if certificate can be validated
    try:
        result = store_ctx.verify_certificate()
    except crypto.X509StoreContextError:
        return False

    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--cert", type=argparse.FileType('rb'), dest="cert", help="Server cert to check", required=True)
    parser.add_argument("-a", "--ca", type=argparse.FileType('rb'), dest="ca", help="CA, could be defined several times", required=True, action="append")
    args = parser.parse_args()

    if verify(args.cert, args.ca):
        print("Las CAs firman el certificado")
    else:
        print("ERROR: Certificado no validado por las CAs")
