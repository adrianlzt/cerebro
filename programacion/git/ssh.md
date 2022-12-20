Para usar una configuración ssh para acceder a un repo:

In ~/.ssh/config, add:

Host gh
        Hostname github.com
        User git
        IdentityFile ~/.ssh/somekey

git clone ssh://gh/username/repo.git

Mirar debug.md si tenemos problemas.


Forzar una key determinada:
SSH_AUTH_SOCK="" GIT_SSH_COMMAND='ssh -i key' git clone ssh://g...


Añadir un remote con puerto distinto de 22
git remote add ssh "git@[gitserver.com:2222]:foo/ansible-role.git"
