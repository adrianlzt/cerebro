https://github.com/influxdata/influxdb/issues/3674

select histogram(usage_system) from cpu where time > now() - 1h group by time(10m)

