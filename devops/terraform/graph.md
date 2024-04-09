https://developer.hashicorp.com/terraform/cli/commands/graph

terraform graph

terraform graph -type=plan | dot -Tpng >graph.png

terraform graph -type=plan-destroy  | dot -Tpng > destroy.png


Otras herramientas para visualizar el plan de terraform:
https://spacelift.io/blog/terraform-graph#other-terraform-visualization-tools


terraform plan -destroy -out=destroy-plan.terraform
terraform show -json destroy-plan.terraform > destroy-plan.json

https://hieven.github.io/terraform-visual/
No muestra el orden, solo lo que se va a crear.



https://28mm.github.io/blast-radius-docs/
Fork reciente:
https://github.com/Ianyliu/blast-radius-fork

Instalado en el "workon test" con:
pip install git+https://github.com/Ianyliu/blast-radius-fork

Para usarlo, en un directorio de terraform ejecutar:
blast-radius --serve .

Navegar a http://localhost:5000/

Nos muestra un grafo de los recursos y sus dependencias.

Podemos pedirle también que nos genere el gráfico de destroy.
Generamos el fichero .dot con:
terraform graph -type=plan-destroy > destroy.dot

Luego pulsamos al botón del teclado y pegamos el contenido del fichero.
En este caso, las cosas de "más abajo" se destruyen antes que las de "más arriba".
