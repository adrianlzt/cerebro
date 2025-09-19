Una vez configurado el fichero de oci (api_key_config.md) podemos hacer uso de la cli.

yay oci-cli

# Listado de compartments

```bash
oci iam compartment list
```

# VMs

```bash
oci compute instance list -c compartment_ocid
```
