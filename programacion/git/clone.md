Con diferente puerto:
git clone "ssh://git@10.0.2.7:2222/group/ansible-deploy.git"

git clone "[git@10.0.2.7:2222]:group/ansible-deploy.git"


git clone --depth=1 https://github.com/raspberrypi/linux
Bajar una copia de los ficheros, sin historial y sin otras ramas


Usando otra clave ssh (generalmente la mejor aproximación es meterla en el ssh agent):
GIT_SSH_COMMAND='ssh -i ~/.ssh/foobar -o IdentitiesOnly=yes' git clone git@bitbucket.org:foo/bar.git



Ignorar TLS
git -c http.sslVerify=false clone https://example.com/path/to/git
