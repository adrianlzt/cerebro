https://nixery.dev/
https://github.com/tazjin/nixery

Arrancar una imagen con NixOS con las tools que le pidamos, ejemplo:
docker run --rm -ti nixery.dev/shell/git/htop bash

docker run --rm -ti nixery.dev/curl curl example.com

docker run --rm -it -e PYTHONPATH=/lib/python3.11/site-packages nixery.dev/python311/python311packages.selenium/python311packages.certifi/python311packages.urllib3 python3

Para buscar que paquetes tenemos disponibles:
https://search.nixos.org/packages?query=selenium

Poner el nombre en minúsculas (mirar el ejemplo de selenium).

Repositorios que están configurados:
https://cs.tvl.fyi/depot/-/blob/third_party/sources/sources.json
