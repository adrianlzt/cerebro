Búsqueda para ver el consumo por máquina por día:
index=_internal metrics kb series!=_* "group=per_host_thruput" monthsago=1 | eval indexed_mb = kb / 1024 | timechart fixedrange=t span=1d sum(indexed_mb) by series | rename sum(indexed_mb) as totalmb

Si queremos ver el consumo por sourcetype:
index=_internal metrics kb series!=_* "group=per_sourcetype_thruput" monthsago=1 | eval indexed_mb = kb / 1024 | timechart fixedrange=t span=1d sum(indexed_mb) by series | rename sum(indexed_mb) as totalmb

