<https://pulumi.io/quickstart/gcp/index.html>

Librerias para hacer IaaS con python, go o javascript

# CLI

## target

Como en terraform, para apuntar únicamente a un recurso.

Tenemos que pasar el Uniform Resource Name (URN).

Lo más fácil para buscar ese valor es:

```bash
pulumi stack export | fx
```

Si no existe, tendremos que ver el "pulumi plan" el valor que nos da.

Ejemplo:

```bash
pulumi up -t "urn:pulumi:azure::azure-subscription-manager::azure-native:authorization:RoleManagementPolicy::internal-contributor-policy"
```

## exclude

El inverso de target

```
--exclude "**PimRoleEligibilitySchedule**"
```

## destroy

Para quitar recursos de la "memoria":

```bash
pulumi destroy --target <URN>
```

## diff

Usar `--diff` para mostrar los cambios a aplicar.

## refresh

Si queremos actualizar la visión que tenemos de los recursos remotos localmente.

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

# Problemas

Si metemos algunas lógicas de python complejas, por ejemplo, iterar sobre una serie de reglas y modificar un valor, parece que pulumi no sabe si eso va a modificar algo y da por modificado el recurso.

# Pulumi vs Terraform

## Pro pulimi

Podemos ignorar recursos (el inverso de `target`).

Toda la potencia de python

## Con pulumi

¿Providers menos testeados? Algunos problemas con azure.
