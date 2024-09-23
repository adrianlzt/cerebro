# helm

Para poner annotations correctamente escapar los puntos:

```terraform
  set {
    name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-ssl-ports"
    value = "https"
  }
```

Si no, el provider de helm dará estos errores:

```
Error: values don't meet the specifications of the schema(s) in the following chart(s):
nginx-ingress:
- controller.service.annotations.service: Invalid type. Expected: string, given: object
```
