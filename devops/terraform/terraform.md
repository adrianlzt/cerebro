https://www.terraform.io/docs/commands/index.html

En oh-my-zsh hay autocomplete para terraform


# Init
Una vez tenemos uno, o varios, ficheros de configuración (.tf) ejecutaremos
terraform init

Esto se descargará los plugins necesarios para los providers que estemos usando. Estos plugins son ficheros binarios que se almacenarán en .terraform/ dentro del directorio de trabajo.



# Plan
Una vez tenemos los plugins necesarios podemos ver que va a hacer terraform ejecutando el comando:
terraform plan

El output nos dirá que se va a crear, modificar o destruir.
Podremos ver las variables que tenemos, o tendremos, disponibles por cada elemento.
Si una variable se conocerá al crear la máquina (por ejemplo, ip de una VM), pondrá "<computed>"

Para saber que hacer consultará los providers para conocer el estado actual.
Si queremos asegurarnos que ejecutamos el plan tal y como lo mostramos, podemos almacenarlo con -out y luego aplicarlo (si no, podría suceder que cuando vayamos a ejecutar el apply el estado haya cambiado)

Podemos usar "-target=resource" para especificar solo tocar ciertos recursos.
Lo marcan como uso excepcional.



# Apply
Con este comando aplicaremos el plan sobre los providers.

Tras su ejecucción se creará un fichero (json) terraform.tfstate con lo que se ha generado y los outputs que pusimos.

Se puede usar un backend para mantener el estado desplegado. Mirar backend.md
Útil para trabajar en equipo (manteniendo un estado común), esconder secretos, remote operations.




# Output
Recuperar un valor de output de un fichero de estado (terraform.tfstate).
Típicamente para ver un valor del último apply



# Show
Si queremos ver el detalle de todos los recursos desplegados usaremos
terraform show
terraform show -json

O de uno en concreto:
terraform state show google_sql_database_instance.prod_postgres
