https://registry.terraform.io/providers/oracle/oci/latest/docs

Ejemplos
https://github.com/oracle/terraform-provider-oci/tree/master/examples


# Identity

## Compartment
https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/identity_compartment
https://docs.oracle.com/en-us/iaas/developer-tutorials/tutorials/tf-compartment/01-summary.htm

Para poder crear recursos primero necesitamos un compartment donde meterlos.

# VMs / oci_core_instance
https://registry.terraform.io/providers/oracle/oci/latest/docs/resources/core_instance


Para obtener los OCID de las imágenes:
oci compute  image list --compartment-id XXXX
