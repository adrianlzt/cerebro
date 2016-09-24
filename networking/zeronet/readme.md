Una internet descentralizada montada sobre P2P.

https://zeronet.io/
https://github.com/HelloZeroNet/ZeroNet#user-content-how-to-join

# Uso con Docker
mkdir ~/Documentos/zeronet_data
docker run -d -v ~/Documentos/zeronet_data:/root/data -p 15441:15441 -p 43110:43110 nofish/zeronet
http://127.0.0.1:43110/

# Uso con server python
mkvirtualenv2 zeronet
pip install msgpack-python gevent
git clone git@github.com:HelloZeroNet/ZeroNet.git
cd ZeroNet
./zeronet.py
http://127.0.0.1:43110/


# Uso
Al entrar accedemos a una app através de la que navegamos.

ZeroName -> lista de dominios a los que podemos acceder

Los otros Zero... son webs montadas por la gente de ZeroNet.

# Funcionamiento
Cuando queremos acceder a una web nos la bajamos de la red P2P y la visualizamos.

Cuando nos bajamos una web pasamos a formar parte de la gente que comparte esa web.

Si toda la gente que comparte una web, esa web desaparece.

# Dudas
Anonimizidad?
Funcionamiento con la red tor?
