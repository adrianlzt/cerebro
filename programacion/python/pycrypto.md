pycrypto esta abandonada, usar: https://github.com/Legrandin/pycryptodome

La antigua: https://www.dlitz.net/software/pycrypto/doc/

Otra alternativa: M2Crypto
https://docs.launchkey.com/developer/encryption/python/python-encryption.html


# RSA
Generalmente querremos usar RSA mediante PKCS#1 OAEP.
https://www.dlitz.net/software/pycrypto/api/2.6/Crypto.Cipher.PKCS1_v1_5-module.html

Ejemplo en rsa.py


# AES
mirar aes.py
http://www.codekoala.com/posts/aes-encryption-python-using-pycrypto/

La clave debe ser de 16, 24 o 32 bytes.

Lo que se encripte tambien debe tener el mismo tamaño de bloque. El ejemplo de codekoala rellena con "{"

Depende del modo usado hace falta usar padding o no.


Ejemplo usando AES-CBC y algunas particularidades para hablar con CryptoJS
https://gist.github.com/adrianlzt/d5c9657e205b57f687f528a5ac59fe0e
Tambien en este dir: aes_cryptojs_pycrypto.js aes_cryptojs_pycrypto.py
Y para la version vieja de CryptoJS: aes_cryptojs_old_pycrypto.js aes_cryptojs_old_pycrypto.py


From PyCrypto to CryptoJS
https://gist.github.com/marcoslin/8026990
CFB, PKCS#7


# PIP Anticuado
https://pypi.python.org/pypi/pycrypto
El código que está en pip está anticuado, mejor bajarse el repo y hacer el build.

Por ejemplo, para AES OFB https://github.com/dlitz/pycrypto/issues/187
Obliga a tener una lontigud de bloque fija. Arreglado en el repo pero no en la version de pip
pip install pycrypto-2.7a1.tar.gz
  (almacenado en este directorio)



# Ejemplo simple de encriptación asimétrica con AES-ECB
from Crypto.Cipher import AES
import base64

msg_text = 'test some plain text here'.rjust(32)
secret_key = '1234567890123456' # create new & store somewhere safe

cipher = AES.new(secret_key,AES.MODE_ECB) # never use ECB in strong systems obviously
encoded = base64.b64encode(cipher.encrypt(msg_text))
# ...
decoded = cipher.decrypt(base64.b64decode(encoded))
print decoded.strip()
