<https://github.com/stern/stern>
deprecated

Ahora bajarlo de aquí y meterlo en nuestro path
<https://github.com/stern/stern/releases>
Usarlo direcatametne como stern

kubectl krew install stern

Prefija los logs con el nombre del pod que los genera.

Tail the kube-system namespace excluding logs from kube-apiserver pod
stern -n kube-system --exclude-pod kube-apiserver .

Tail the pods filtered by run=nginx label selector across all namespaces
stern --all-namespaces -l run=nginx

kc stern --tail 40 -l app=foo

Todos los pods, solo últimas 40 líneas, sin intercalar líneas de pods
stern . --tail 40 --no-follow --max-log-requests 1

Todos los pods, modo follow, quitando ciertras trazas por regex y quitando ciertos pods por regex.

```bash
kc stern --tail 10 -l environment=Staging -e opentelemetry -e trace_id --exclude-pod '.*(trace|flower|worker).*'
```
