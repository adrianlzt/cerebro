Podemos usar variables para poner unos seleccionables que el usuario pueda modificar.
También nos sirven para separar el "código de los datos" en los dashboards y que sean facilmente modificables.
Por ejemplo, poniendo el datasource en una variable.


# Variables custom con key:value
https://community.grafana.com/t/key-value-style-for-custom-template-variable-configuration-and-usage/3109

Si queremos que al usuario se le muestre un texto indicativo y que por detrás estémos usando otro valor, podemos hacer uso de los datasources SQL.

Ejemplo:
SELECT '1 week' AS __text, 7 AS __value UNION SELECT 'two weeks' AS __text, 14 AS __value
