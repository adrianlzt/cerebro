#!/usr/bin/env python
#
# http://www.yothenberg.com/validate-x509-certificate-in-python/
#
# Los certificados deben ser tipo pem
#

from OpenSSL import crypto
import argparse

def verify(cert_pem, trusted_cert_pems):

    certificate = crypto.load_certificate(crypto.FILETYPE_PEM, cert_pem.read())

    # Create and fill a X509Sore with trusted certs
    store = crypto.X509Store()
    for trusted_cert_pem in trusted_cert_pems:
        trusted_cert = crypto.load_certificate(crypto.FILETYPE_PEM, trusted_cert_pem.read())
        store.add_cert(trusted_cert)

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
    parser.add_argument("-c", "--cert", type=file, dest="cert", help="Server cert to check", required=True)
    parser.add_argument("-a", "--ca", type=file, dest="ca", help="CA, could be defined several times", required=True, action="append")
    args = parser.parse_args()

    if verify(args.cert, args.ca):
        print("Las CAs firman el certificado")
    else:
        print("ERROR: Certificado no validado por las CAs")
