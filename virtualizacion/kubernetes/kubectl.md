https://kubernetes.io/docs/reference/kubectl/cheatsheet/
https://kubernetes.io/docs/tasks/tools/install-kubectl/
Herramienta administrativa de Kubernetes
mirar plugins.md para extenderla

Extensión fzf para mayor velocidad a la hora de pedir recursos:
https://github.com/bonnefoa/kubectl-fzf
Hace falta tener un demonio corriendo cacheando a un fichero.


Instalar plugin kubectx para moverse entre contexts y namespaces
kubens / kubects / kubectl ns / kubectl ctx

# Instalacion
## Google Cloud SDK
Si tenemos instalado Google Cloud SDK
gcloud components install kubectl

## Archlinux
yaourt -Ss aur/kubectl-bin

## Manual
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl


# Alias kubectl, context y namespace
kc = kubectl
ckc = cambiar de contexto (disable, quitamos el prompt de spaceship zsh)
nkc = cambiar de namespace

https://github.com/ahmetb/kubectx
cambiar de contexto
kubectx

cambiar de namespace
kubens



# Config / contexts
~/.kube/config
Si queremos poner ficheros usamos estilo "client-certificate", si queremos poner texto usamos estilo "client-certificate-data" y hacemos un "base64 -w 0" del fichero
Tres secciones:
  - cluster
      podemos poner "insecure-skip-tls-verify: true" para ignorar cert
  - context (cluster+user+namespace)
  - users


Forzar un fichero
kubectl --kubeconfig=''

kubectl config view
kubectl config view --minify
  solo ver la config activa

Contexto actual:
kubectl config current-context

Cambiar de contexto:
kubectl config use-context FOO

Namespace actual:
kubectl config view -o jsonpath="{.contexts[?(@.name == '$(kubectl config current-context)')].context.namespace}"


## Contextos
Un contexto relaciona un cluster, un usuario y un namespace.

Por defecto tendremos configurado el namespace "default".

Si queremos cambiar el namespace de un context:
kubectl config set-context --current --namespace default
kubectl config set-context demo-adrian --namespace kube-system

Lo suyo es tener un contexto por cada namespace que usemos.
Podemos seguir una nomenclatura de contextos tipo:
nombrecluster-(nombreuser?-)nombrenamespace

Cambiar de contexto (plugin krew ns)
kubectx



# Uso

Info cluster (útil para configurar kubectl en un cliente)
kubectl cluster-info

Dump de todo el contenido del cluster:
kubectl cluster-info dump


Nodos del cluster
kubectl get nodes

-w hace como watch, y se queda mostrando la información


Todos los "resources" que nos ofrece el cluster (tambien CRDs)
kubectl api-resources


nos devuelve muchos de los recursos, pero no todos, que tengamos configurados en nuestro NS
kubectl get all

Obtener todos los recursos de un namespace (sin events)
kubectl api-resources --verbs=list --namespaced -o name | grep -v events | xargs -n 1 kubectl get --show-kind --ignore-not-found


Devolver ciertos recursos
kubectl get po,deploy


# Servicios
Listar
kubectl get svc


# Pods
Listar
kubectl get pod -o wide
  con -o wide veremos la IP del pod y en que nodo está desplegado

Crear: mirar shell.md

Exponer
kubectl expose deployment hello-minikube --type=NodePort


# Crear objectos con un YAML
kubectl create -f fichero.yml

Inline:
cat <<EOF | kubectl create -f -
apiVersion: v1
...
EOF

kubectl apply -f fichero.yml
  crea o actualiza



# Debug
kubectl -v 6 ...
Esto nos saca que llamada HTTP se hace



# Output
https://kubernetes.io/docs/reference/kubectl/#formatting-output

## JSONpath
https://kubernetes.io/docs/reference/kubectl/jsonpath/
kubectl get XX -o json
kubectl get pods -o=jsonpath='{.items[0]}'

Me parece más sencillo usar "-o json" y luego jq


## Go template
https://kubernetes.io/docs/tasks/access-application-cluster/list-all-running-container-images/#list-container-images-using-a-go-template-instead-of-jsonpath

kubectl get pods --all-namespaces -o go-template --template="{{range .items}}{{range .spec.containers}}{{.image}} {{end}}{{end}}"

kubectl get secret my-secret -o go-template='{{range $k,$v := .data}}{{"### "}}{{$k}}{{"\n"}}{{$v|base64decode}}{{"\n\n"}}{{end}}'

### go template file
https://cloud.redhat.com/blog/customizing-oc-output-with-go-templates

$ cat podlist.gotemplate 
{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}
$ oc get pods -o go-template-file=podlist.gotemplate

Otro ejemplo:
``````
{{range .items}}
---
apiVersion: v1
kind: Service
metadata:
 name: {{.metadata.name}}
spec:
 clusterIP: None
 externalIPs:
 {{- range .status.addresses }}
 {{- if eq .type "InternalIP" }}
 - {{.address}}
 {{- end }}
 {{- end }}
 type: ClusterIP
{{- end }}
``````



# diff
KUBECTL_EXTERNAL_DIFF=meld kubectl diff -f some-resources.yaml


# Dry-run
kc apply --dry-run=server -f replicationcontroller.yaml

  server = the request is still processed as typical request: the fields are defaulted, the object is validated, it goes through the validation admission chain, and through the mutating admission chain, and then the final object is returned to the user as it normally would, without being persisted.



# exec
kubectl exec svc/foo
  ejecutar en uno de los pods que sirven ese service


# logs
Ver de varios pods al mismo tiempo
kubectl logs -n 40 -f -l app=foo
