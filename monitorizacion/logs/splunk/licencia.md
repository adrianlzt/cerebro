http://docs.splunk.com/Documentation/Splunk/latest/Admin/HowSplunklicensingworks
http://docs.splunk.com/Documentation/Splunk/latest/Admin/TypesofSplunklicenses
http://docs.splunk.com/Documentation/Splunk/latest/Admin/Manageyourlicenses
http://docs.splunk.com/Documentation/Splunk/latest/Admin/Aboutlicenseviolations

Splunk charges you based on the amount of data you index.


Para ver el consumo de cada índice:
Ir a la App Search -> Status -> Index Activity -> Indexing Volume


Búsqueda para ver el consumo por máquina por día:
index=_internal metrics kb series!=_* "group=per_host_thruput" monthsago=1 | eval indexed_mb = kb / 1024 | timechart fixedrange=t span=1d sum(indexed_mb) by series | rename sum(indexed_mb) as totalmb



Los índices _internal, _autid, _internaldb, etc, no cuentan para la licencia.
