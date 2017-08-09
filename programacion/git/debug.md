GIT_TRACE=1 git pull

# SSH
https://developer.github.com/guides/using-ssh-agent-forwarding/

Para probar que nuestra clave es buena
ssh -o IdentitiesOnly=yes -i .ssh/clave.pem git@github.com
  forzamos a conectar con esa clave, aunque el ssh agent tenga mas

GIT_SSH_COMMAND="ssh -v" git ...

ssh -vvvT git@github.com git-upload-pack 'orga/repo.git'



Comandos para usar directamente con ssh
git-upload-pack monit/utils.git
  nos da la misma info que ls-remote
git-receive-pack monit/utils.git
