https://influxdb.com/docs/v0.9/write_protocols/line.html#fields
Integers: 1i, 345i, 2015i, -10i
Float: 1, 1.0, -3.14, 6.0e5, 10
Boolean: t, T, true, True, TRUE, f, F, false, False and FALSE
Strings: deben venir entre comillas dobles ("). Este caracter se puede escapar como \"


if you attempt to write data with a different type than previously used (for example, writing a string to a field that previously accepted integers), InfluxDB will reject those data.

Parece que no está implementado aún el que diga que tipo de dato se ha inferido:
https://github.com/influxdata/influxdb/issues/3451


No se puede almacenar en un mismo measurement datos de distinto tipo:
curl -i -XPOST 'http://localhost:8086/write?db=dsmctools' --data-binary 'nginx_status,check=Writing value=1i 1452530015
nginx_status,check=RBytes value=1.0 1452530015'

{"error":"write failed: field type conflict: input field \"value\" on measurement \"nginx_status\" is type float64, already exists as type integer"}

