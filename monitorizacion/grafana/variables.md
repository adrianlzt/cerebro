Podemos usar variables para poner unos seleccionables que el usuario pueda modificar.
También nos sirven para separar el "código de los datos" en los dashboards y que sean facilmente modificables.
Por ejemplo, poniendo el datasource en una variable.


# Variables custom con key:value
https://community.grafana.com/t/key-value-style-for-custom-template-variable-configuration-and-usage/3109

Si queremos que al usuario se le muestre un texto indicativo y que por detrás estémos usando otro valor, podemos hacer uso de los datasources SQL.

Ejemplo:
SELECT '1 week' AS __text, 7 AS __value UNION SELECT 'two weeks' AS __text, 14 AS __value


# Variable dinámica en base a otra variable
Usando un datasource de postgres (solo lo queremos por su funcionalidad SQL, no vamos a obtener datos).

```
WITH env AS (
    SELECT
        '$env' AS a
)
SELECT
    CASE WHEN a = 'prod' THEN
        'one'
    WHEN a = 'pre' THEN
        'two'
    ELSE
        'other'
    END
FROM
    env;
```


Generar varios valores para un valor determinado de otra variable:
```
WITH env AS (
    SELECT
        'pre' AS a
),
checks AS (
SELECT
    CASE WHEN a = 'prod' THEN
        ARRAY['foo','bar']
    WHEN a = 'pre' THEN
        ARRAY['baz']
    WHEN a = 'qa' THEN
        ARRAY['foz']
    ELSE
        ARRAY['NOT KNOWN']
    END AS value
FROM
    env
)
SELECT
    unnest(value) AS domain from checks;
```
