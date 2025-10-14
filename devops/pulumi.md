<https://pulumi.io/quickstart/gcp/index.html>

Librerias para hacer IaaS con python, go o javascript

# Azure

<https://www.pulumi.com/registry/packages/azure-native/>

# Debug / logging

Para sacar las trazas de lo que hace pulumi:

<https://www.pulumi.com/docs/iac/troubleshooting/debugging/logging/>

```bash
pulumi ... -v=10 --logflow
```

Lo almacenará en un fichero en `/tmp/pulumi.INFO`
`--logflow` para que también se aplique a los providers.

## Debug provider

<https://www.pulumi.com/docs/iac/troubleshooting/debugging/debugging-providers/#running-pulumi-with-debug-providers>

Podemos correr un provider localmente y apuntar a él usando:

```bash
PULUMI_DEBUG_PROVIDERS="azure-native:PIDPROCESO" pulumi ...
```

```bash
cd provider/cmd/pulumi-resource-azure-native
dlv debug
b ../../../provider/pkg/resources/customresources/custom_pim_eligibility.go:459
```
