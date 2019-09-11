https://www.postgresql.org/docs/current/functions-aggregate.html

Las agregaciones nos sirven para coger varios campos de un tipo y meterlos todos en la misma celda

jsonb_agg(expression)
jsonb_object_agg(name, value)
string_agg(expression, delimiter)


Hacer un dict JSON a partir de valores de una tabla:
SELECT jsonb_object_agg(trigger_tag.tag, trigger_tag.value)
FROM trigger_tag
WHERE triggers.triggerid = trigger_tag.triggerid
GROUP BY triggers.triggerid)

Hacer un array JSON:
SELECT jsonb_agg(groups.name)
FROM hosts_groups,
     groups AS groups
WHERE hosts.hostid=hosts_groups.hostid
  AND hosts_groups.groupid=groups.groupid
GROUP BY hosts.hostid



# Count
select count(*)
  contar número de apariciones

select count(some_col)
  número de rows donde some_col is not null
