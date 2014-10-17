https://github.com/mwclient/mwclient
>>> import mwclient
>>> site = mwclient.Site('wikis.com','/path/')
>>> site.login(username='USUARIO',password='CONTRASEÑA',domain='DOMINIO')
>>> page = site.Pages['PROYECTO']
>>> page.text()
u'Prueba de p\xe1gina'


Login example in Python, regarding the API:Login article.
Con la libreria requests
http://www.mediawiki.org/wiki/User:Sebelino7/Login_with_Python
