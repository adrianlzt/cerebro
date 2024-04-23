Si queremos borrar todo menos un recurso:

# list all resources
terraform state list

# remove that resource you don't want to destroy
# you can add more to be excluded if required
terraform state rm <resource_to_be_deleted>

# destroy the whole stack except above excluded resource(s)
terraform destroy


Destruir pasando por el plan:
terraform plan -destroy -out=destroy-plan.terraform
terraform apply "destroy-plan.terraform"

Si queremos ver como va a realizar las tareas, mirar en graph.md
