Lanzar un curl dentro de un NS para obtener datos de un service

```bash
kubectl run tmp-curl --image=curlimages/curl:latest --rm -i --restart=Never -- curl ...
```
