PaaS No-SQL

Clave-valor

Rendimiento constante y predecible a cambio de funcionalidades limitadas.

Te orientas a tablas. A cada tabla le pides un rendimiento de escritura y lectura.
Ej.: quiero poder leer 100000 de unidades por segundo.
Es estable, le puedes meter 100 unidades o 1000000

Cobra por unidades aprovisionadas por segundo.
Se puede aumentar el aprovisionamiento en caliente, duplicando en cada operación.
No se puede andar jugando con el aprovisionamiento, tienen límites para bajar (1 operacion al día, o algo parecido)

Una unidad es leer o escribir hasta 1KB de información por segundo. Si te quedas corto te cobran una unidad, si te pasas, pues 2, 3, etc

# Web UI

<https://us-east-2.console.aws.amazon.com/dynamodbv2/home?region=us-east-2#item-explorer?maximize=true&operation=SCAN&table=backup>

# aws cli

<https://awscli.amazonaws.com/v2/documentation/api/latest/reference/dynamodb/index.html#cli-aws-dynamodb>

```bash
aws dynamodb list-tables
aws dynamodb describe-table --table-name backup
```

Obtener los elementos de una tabla:

```bash
aws dynamodb scan --table-name backup
```

Filtrando usando range:

```bash
aws dynamodb scan --table-name backup --filter-expression "date_epoch BETWEEN :start AND :end" --expression-attribute-values "{\":start\":{\"N\":\"$(date -d 2024-09-19 +%s)\"},\":end\":{\"N\":\"$(date -d 2024-09-20 +%s)\"}}"
```
