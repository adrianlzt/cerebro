<https://github.com/Freika/dawarich>

Self-hostable alternative to Google Location History (Google Maps Timeline)

Podemos exportar desde el teléfono la info de tracking y subirla a esta plataforma para visualizarlo.

Para sacar la info del teléfono: <https://github.com/Freika/dawarich/discussions/598#discussioncomment-11684881>

Se despliega con docker-compose.

Para acceder a la postgis:

```bash
docker exec -it -u postgres dawarich_db psql -d dawarich_development
```

Ejemplo sacando fechas, ubicación y país:

```sql
select to_timestamp(timestamp),lonlat,c.name from points p join countries c on (p.country_id=c.id) where timestamp > 1735686000 order by timestamp asc limit 4;
```
