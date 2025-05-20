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

Los diferentes units los generará en $PWD/.terragrunt-stack/MODULO

## Debug / troubleshooting

Si quiero tener más control sobre la ejecución de una unit en particular, primero ejecutaré el stack con:

```bash
terragrunt --experiment=stacks stack run apply --log-level debug --inputs-debug
```

Esto generará un directorio por unit, tipo: `.terragrunt-stack/FOOBAR`

Dentro de ese fichero tendremos las variables usadas en el fichero `terragrunt-debug.tfvars.json`

Para poder ejecutarlo tendremos que comentar toda la sección de `input` y ejecutar con:

```bash
terragrunt plan -var-file terragrunt-debug.tfvars.json
```

Si tenemos dependencias puede dar algunos errores (intentando buscar `values`), pero continua.
