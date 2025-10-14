<https://pulumi.io/quickstart/gcp/index.html>

Librerias para hacer IaaS con python, go o javascript

# target

Como en terraform, para apuntar únicamente a un recurso.

Tenemos que pasar el Uniform Resource Name (URN).

Lo más fácil para buscar ese valor es:

```bash
pulumi stack export | fx
```

Ejemplo:

```bash
pulumi up -t "urn:pulumi:azure::azure-subscription-manager::azure-native:authorization:RoleManagementPolicy::internal-contributor-policy"
```

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

# Azure

<https://www.pulumi.com/registry/packages/azure-native/>
