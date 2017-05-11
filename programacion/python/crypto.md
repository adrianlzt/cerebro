Mirar pycrypto.md si estamos buscando una solución con terceras librerias.

Para un caso sencillo de encriptación simétrica (no me funciona, no he mirado porque):

http://stackoverflow.com/questions/2490334/simple-way-to-encode-a-string-according-to-a-password
import base64

def encode(key, string):
    encoded_chars = []
    for i in xrange(len(string)):
        key_c = key[i % len(key)]
        encoded_c = chr(ord(string[i]) + ord(key_c) % 256)
        encoded_chars.append(encoded_c)
    encoded_string = "".join(encoded_chars)
    return base64.urlsafe_b64encode(encoded_string)
