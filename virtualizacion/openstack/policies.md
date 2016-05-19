http://docs.openstack.org/kilo/config-reference/content/policy-json-file.html

En los ficheros policy.json se define que usuarios/roles pueden ejecutar que operaciones


Los "rules" son alias que estarán definidos en otra parte.

Ejemplo:
    "admin_api": "is_admin:True",

Y luego lo usa:
    "compute_extension:hosts": "rule:admin_api",
