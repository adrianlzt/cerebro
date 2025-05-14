<https://github.com/opentofu/opentofu/issues/1685>
<https://www.hashicorp.com/es/blog/terraform-stacks-explained>

Este es el típico problema de desplegar un cluster de k8s y luego querer provisionar sobre él.
No sep puede porque el provider de k8s no es capaz de obtener la información, por que aún no existe.

Parece que terraform lo soluciona con "stacks", solución por aún solo de pago.

Terragrunt provee el concepto de stacks: <https://terragrunt.gruntwork.io/docs/features/stacks/>
