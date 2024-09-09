<https://spacelift.io/blog/terraform-for-loop>

```terraform
variable "storage_account_names" {
  type = list(string)
  default = ["jackuksstr001", "jackuksstr002", "jackuksstr003"]
}
```

```terraform
resource "azurerm_storage_account" "my_storage" {
  for_each = toset(var.storage_account_names)
  name = "read-only-${each.key}"
```

<https://blog.gruntwork.io/terraform-tips-tricks-loops-if-statements-and-gotchas-f739bbae55f9>

```terraform
resource "aws_instance" "example" {
  count = 3
  ami = "ami-2d39803a"
  instance_type = "t2.micro"
}

resource "aws_instance" "example" {
  count = 3
  ami = "ami-2d39803a"
  instance_type = "t2.micro"
  tags {
    Name = "example-${count.index}"
  }
}

variable "azs" {
  description = "Run the EC2 Instances in these Availability Zones"
  type = "list"
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}
resource "aws_instance" "example" {
  count = "${length(var.azs)}"
    ami = "ami-2d39803a"
    instance_type = "t2.micro"
    availability_zone = "${element(var.azs, count.index)}"
  tags {
    Name = "example-${count.index}"
  }
}
```

Acceder a un campo determinado de una lista de elementos:

```terraform
element(aws_subnet.foo.\*.id, count.index)
```

# for_each

<https://developer.hashicorp.com/terraform/language/meta-arguments/for_each>

```terraform
resource "aws_iam_user" "the-accounts" {
  for_each = toset( ["Todd", "James", "Alice", "Dottie"] )
  name = each.key
}
```

for_each necesita un diccionario.

```terraform
for_each = { for app in var.apps : app.name => app }
```

En python sería:

```python
{ v["name"]: v  for v in default }
```

## for_each + condicional

```terraform
for_each = var.managed_environment == false ? { for nic in module.vm_iometrics.vm_net : nic.name => nic } : {}
```

# for

<https://developer.hashicorp.com/terraform/language/expressions/for>

Generar un for a partir de dos maps:

```terraform
for group in concat(
  [for k,v in google_compute_instance_group.vm : v],
  [for k,v in google_compute_instance_group.vm_rep : v],
) :

resource "google_compute_region_backend_service" "zabbix-server-internal" {
  name = "zabbix-server-internal"
  dynamic "backend" {
    for_each = google_compute_instance_group.iometrics-and-rep
    content {
      group = backend.value["id"]
      balancing_mode = "CONNECTION"
    }
  }
  ...
}
```

# for_each vs count

Como acceder a una lista de objetos.
Tenemos dos opciones, convertir la lista a un map o iterar elemento a elemento con count:

```terraform
variable "apps" {
  type = list(any)
  default = [
    {
      name = "name1"
      age  = 20
    },
    {
      name = "name2"
      age  = 30
    },
    {
      name = "name3"
      age  = 40
    },
  ]
}

# Con el for_each generamos un map: {name1: {name: name1, age: 20}, name2: {...
resource "local_file" "example" {
  for_each = { for app in var.apps : app.name => app }
  content  = "Key: ${each.key} - Value: ${jsonencode(each.value)}"
  filename = "${path.module}/${each.value.name}.txt"
}

# Aquí hacemos la típica iteración de: for i in len(lista): lista[i]
resource "local_file" "example2" {
  count    = length(var.apps)
  content  = "Value: ${jsonencode(var.apps[count.index])}"
  filename = "${path.module}/${var.apps[count.index].name}.md"
}
```
