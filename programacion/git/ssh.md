Para usar una configuración ssh para acceder a un repo:

In ~/.ssh/config, add:

Host gh
        Hostname github.com
        User git
        IdentityFile ~/.ssh/somekey

git clone ssh://gh/username/repo.git

Mirar debug.md si tenemos problemas.


Forzar una key determinada:
GIT_SSH_COMMAND='ssh -i key' git clone ssh://g...
