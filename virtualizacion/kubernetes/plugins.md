https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/#before-you-begin

Podemos extender kubectl con nuevos comandos a base de plugins.
Los plugins puede ser algo tan tonto como un script en bash.
Ejemplo: https://github.com/sysdiglabs/kubectl-capture/blob/master/kubectl-capture


# krew
gestor de plugins

https://github.com/kubernetes-sigs/krew
Mirar ahí como instalarlo

instalar un plugin:
kubectl krew install xxx

lista:
https://github.com/kubernetes-sigs/krew-index/blob/master/plugins.md

Plugins instalados
kubectl krew list

Actualizar los plugins
kubectl krew upgrade



Plugins útiles
exec-as
ns
  cambiar de ctx o ns con kubectx o kubens
view-secret
rbac-lookup
who-can
whoami
capture
  arrancar sysdig escuchando en un pod
df-pv
  como df para los volumenes persistentes
sniff
  capturar con wireshask, mirar debug.md
