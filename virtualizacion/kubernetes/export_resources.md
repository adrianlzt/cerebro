Antes existía un --export para quitar los campos no necesarios.
Ahora lo han eliminado, pero podemos usar este krew:

https://github.com/itaysk/kubectl-neat
kubectl krew install neat
kc get deployments.apps baremetal-operator-ironic -o yaml | kc neat > file.yaml
