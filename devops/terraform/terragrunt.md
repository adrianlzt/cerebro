<https://terragrunt.gruntwork.io/>

DRY (don't repeat yourself) and maintainable OpenTofu/Terraform code.
Terragrunt is a flexible orchestration tool that allows Infrastructure as Code to scale.

# Units

Directorio con un fichero `terragrunt.hcl`.
Es la mínima unidad desplegable por terragrunt.

La idea es que cada unit apunta a un módulo de terraform.

# Stacks

<https://terragrunt.gruntwork.io/docs/features/stacks/>

Para poder ejecutar varios terragrunts en un orden y pasando variables de los primeros hacia abajo.

Más seguro ejectarlo con:

```bash
--no-auto-approve
```

Los diferentes units los generará en $PWD/.terragrunt-stack/MODULO

Complica el hacer troubleshooting, porque como pasa variables entre stacks, luego es dificil reproducir el error, hacer imports o usar "target" para probar cosas.

## Debug / troubleshooting

Si quiero tener más control sobre la ejecución de una unit en particular, primero ejecutaré el stack con:

```bash
terragrunt --experiment=stacks stack run apply --log-level debug --inputs-debug
```

Esto generará un directorio por unit, tipo: `.terragrunt-stack/FOOBAR`

Dentro de ese fichero tendremos las variables usadas en el fichero `terragrunt-debug.tfvars.json`

Para poder ejecutarlo tendremos que comentar toda la sección de `input` del `terragrun.hcl` y ejecutar con:

```bash
terragrunt plan -var-file terragrunt-debug.tfvars.json
```

Podemos coger las variables de `terragrunt-debug.tfvars.json` y meterlas en la sección `input` si las necesitamos.
Creo que esto ya lo hace el `-var-file`.

Si tenemos dependencias puede dar algunos errores (intentando buscar `values`), pero continua.

Si tenemos variables en el terragrunt.hcl puede dar fallos.
Alguna vez he tenido que incluso comentar los ficheros .tf del cache que generá quitando variables para conseguir que funcione un import.
