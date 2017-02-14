#
# Encryption with AES-OFB
# Adapted to work with CryptoJS (cryptojs@2.5.3) with default configuracion
#
# Python 2.7.13
# pbkdf2==1.3
# pycrypto==2.7a1 (build from repo, last commit 7acba5f)
#
import binascii
import struct
from pbkdf2 import PBKDF2
from Crypto.Cipher import AES
from Crypto import Random

MODE = AES.MODE_OFB
KEY = 'somekey'
PLAINTEXT = 'some secret';

def encrypt(key_in, plaintext):
    iv = Random.new().read( AES.block_size )
    key = PBKDF2(key_in, iv, iterations=1).read(32)
    aes = AES.new(key, MODE, iv)
    encrypted_text = aes.encrypt(plaintext)

    iv_dec = map(lambda x: struct.unpack('B', x)[0], iv)
    enc_dec = map(lambda x: struct.unpack('B', x)[0], encrypted_text)
    print("iv=%s" % iv_dec)
    print("m=%s" % enc_dec)

    concat = iv+encrypted_text
    print("concat(iv,m)=%s" % (map(lambda x: struct.unpack('B', x)[0], concat)))
    return binascii.b2a_base64(concat).rstrip()

def decrypt(key_in, encrypted_text):
    encrypted_text_bytes = binascii.a2b_base64(encrypted_text)
    or_dec = map(lambda x: struct.unpack('B', x)[0], encrypted_text_bytes)
    print("Original encrypted message=%s" % or_dec)

    iv = encrypted_text_bytes[:AES.block_size]
    m = encrypted_text_bytes[AES.block_size:]

    iv_dec = map(lambda x: struct.unpack('B', x)[0], iv)
    enc_dec = map(lambda x: struct.unpack('B', x)[0], m)
    print("iv=%s" % iv_dec)
    print("m=%s" % enc_dec)

    key = PBKDF2(key_in, iv, iterations=1).read(32)
    aes = AES.new(key, MODE, iv)
    decrypted_text = aes.decrypt(m)
    return decrypted_text

if __name__ == '__main__':
    input_plaintext = PLAINTEXT
    encrypted_text = encrypt(KEY, input_plaintext)
    print("encrypted_text (base64)= %s" % encrypted_text)

    print("\n\nDECRYPT")
    decrypted_text = decrypt(KEY, encrypted_text)
    print("decrypted text = %s" % decrypted_text)
