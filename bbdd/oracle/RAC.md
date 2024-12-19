Los clusters activo-activo

Para saber si estamos en una instancia que es RAC:

```sql
select name, value from v$parameter where name = 'cluster_database';
```
