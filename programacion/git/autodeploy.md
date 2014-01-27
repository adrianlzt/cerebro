Auto-deploy cutre mio

Cuando hago un commit, ejecuto un pull en la máquina remota.
Máquina local, .git/hooks/post-commit:
ssh maquina ./deploy-code.sh
Máquina remota:
Configuro el remote de donde cogeré el código: git remote add adrianHP ssh://maquina/path/
 deploy-code.sh:
 #!/bin/dash
 cd /var/www/t4uAdmin
 echo "\n\n---$(date)---" >> ~/Log_deploy_t4uAdmin
 git pull adrianHP master >> ~/Log_deploy_t4uAdmin 2>&1
