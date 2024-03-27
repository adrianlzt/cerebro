https://fastapi.tiangolo.com/tutorial/cors/

Se produce cuando tenemos un código JS que intenta hablar con una API que está en un "origin" distinto (diferente protocolo/dominio/puerto).

El backend tiene que permitir el origen en la respuesta de la petición OPTIONS.


Podemos ignorar cors instalando extensiones en el navegador
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?hl=fr

O arrancar chrome sin cors:
chromium --disable-web-security --user-data-dir=chromium_small/
