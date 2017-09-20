https://www.terraform.io/docs/import/index.html

Utilizar un recurso no creado por terraform en terraform.

Por ejemplo, tenemos creada ya una floating ip que queremos utilizar:

terraform import openstack_networking_floatingip_v2.floatip_1 2c7f39f3-702b-48d1-940c-b50384177ee1
