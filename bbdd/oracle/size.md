Tamaños de las tablas en megas:
select segment_name,segment_type,bytes/1024/1024 MB
 from dba_segments
 where segment_type='TABLE';
