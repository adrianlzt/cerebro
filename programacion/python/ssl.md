Evitar errores de certificado SSL cuando podemos pasar un ssl context:
http://stackoverflow.com/questions/19268548/python-ignore-certicate-validation-urllib2

import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
