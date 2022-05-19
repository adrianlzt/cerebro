Si queremos borrar todo menos un recurso:

# list all resources
terraform state list

# remove that resource you don't want to destroy
# you can add more to be excluded if required
terraform state rm <resource_to_be_deleted> 

# destroy the whole stack except above excluded resource(s)
terraform destroy 
