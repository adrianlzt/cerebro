# CPU limits

Parece que puede haber problemas con los CPU limits

<https://www.netdata.cloud/blog/kubernetes-throttling-doesnt-have-to-suck-let-us-help/>
<https://github.com/kubernetes/kubernetes/issues/51135>
<https://github.com/kubernetes/kubernetes/issues/67577>
<https://www.youtube.com/watch?v=eBChCFD9hfs>

# Analizar capacidad

Ver los requests cpu de todos los pods y containers de un namespace

```bash
kubectl get pods -o=jsonpath='{.items[*]..resources.limits.cpu}' -A
```

## kube-capacity

<https://github.com/robscott/kube-capacity>
kubectl krew install resource-capacity

Nos da el consumo de los pods desplegados.
Si alguno está fallando por falta de recursos no estará desplegado y por lo tanto no lo veremos.

Para ver el estado de los nodos
kubectl resource-capacity

Para ver también la utilización (necesita metrics-servers)
kubectl resource-capacity --util
kubectl resource-capacity --util --sort cpu.util

Recursos disponibes:
kubectl resource-capacity --available

De los pods:
kubectl resource-capacity --pods
kubectl resource-capacity --pods --util
kubectl resource-capacity --pods --namespace timescaledb

## kube-resource-report
<https://codeberg.org/hjacobs/kube-resource-report>

Aplicación que desplegamos, levanta un server web y muestra un reporte html
