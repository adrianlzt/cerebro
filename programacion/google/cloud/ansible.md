https://docs.ansible.com/ansible/latest/collections/google/cloud/gcp_compute_inventory.html#ansible-collections-google-cloud-gcp-compute-inventory

# Inventario dinámico

Para usar las tags como grupos:
file.gcp.yml
plugin: gcp_compute
projects:
  - NombreProyecto
auth_kind: serviceaccount
service_account_file: Nombre-service-account.json
keyed_groups:
  - key: tags["items"]
    prefix: gcp
hostnames:
  - name
compose:
  ansible_host: networkInterfaces[0].accessConfigs[0].natIP

Si tenemos las tags "foo" y "bar", el host estará en los grupos:
"gcp_goo" y "gcp_bar"

Donde se resuelve 'tags["items"]' con jinja
https://github.com/ansible/ansible/blob/aff78f4cbc9a1afe70ca447e17e4c99582ad16b3/lib/ansible/plugins/inventory/__init__.py#L356:9



