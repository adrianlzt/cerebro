> show RETENTION POLICIES ON telegraf
name    duration        replicaN        default
default 0               1               true


Queries definiendo la retention:

> select * from "default".cpu_usage_idle limit 3

