https://github.com/livingsocial/rearview

Cada cierto tiempo se examina unas métricas, que se pasan por un script de ruby, donde se analizan, y se genera una alerta en caso de ser necesario.

iRearview is a Scala monitoring framework for Graphite time series data. The monitors are simple Ruby scripts which are run in a sandbox to prevent I/O. Each monitor is configured with a crontab compatible time specification used by the scheduler.

Monitors define the following attributes:

One or more Graphite metrics.
Crontab time specification.
Optional Ruby expression. If no custom graph calls are made a default graph is generated.
Optional PagerDuty api keys and/or emails.
