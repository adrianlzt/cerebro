<https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/#before-you-begin>

Podemos extender kubectl con nuevos comandos a base de plugins.
Los plugins puede ser algo tan tonto como un script en bash.
Ejemplo: <https://github.com/sysdiglabs/kubectl-capture/blob/master/kubectl-capture>

# krew

gestor de plugins

<https://github.com/kubernetes-sigs/krew>
Mirar ahí como instalarlo

instalar un plugin:
kubectl krew install xxx

lista:
<https://krew.sigs.k8s.io/plugins/>

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
  muerto? Usar <https://github.com/larryTheSlap/dumpy>
    este usa tcpdump y puedes exportar los .pcap, no lenvanta el wireshark directamente como el sniff
kubectl krew install resource-capacity
  analizar capacidad
