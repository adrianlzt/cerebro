<https://www.home-assistant.io/docs/backend/database/>

Por defecto sqlite, fichero home-assistant_v2.db

Ejemplos de código y queries borrando datos:
<https://community.home-assistant.io/t/modifying-data-in-the-database-via-script/36103/5>

El histórico se almacena en la tabla "states"

```sql
select states_meta.entity_id,to_timestamp(last_updated_ts) as last_updated_ts,to_timestamp(last_reported_ts) as last_reported_ts,state from states join states_meta using (metadata_id) order by last_updated_ts desc limit 4;
```

Borrar histórico, ejemplo (antiguo, ahora hace falta pasar por states_meta):
delete from states where entity_id = "sensor.ble_non_stabilized_weight_volumen_deposito_agua" ;
