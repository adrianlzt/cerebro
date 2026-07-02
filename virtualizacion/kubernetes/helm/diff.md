Plugin para comparar lo que tenemos contra lo que vamos a desplegar:

Instalar:
```bash
helm plugin install https://github.com/databus23/helm-diff --verify=false
```

Comparar:
```bash
helm diff upgrade <release-name> <chart-path-or-repo> --values values.yaml
```
