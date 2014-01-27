https://github.com/noahhl/batsd

Competencia de statsd
Agrega métricas almacenándolas en redis.
Luego un cliente debería conectarse a batsd y ponerla en graphite

Batsd is a ruby-based daemon for aggregating and storing statistics. It targets "wireline" compatibility with Etsy's StatsD implementation, which they described in a blog post.

Batsd differs from etsy's statsd implementation primarily in how it stores data -- data is stored to a combination of Redis and flat files on disk. You can read more about persistence in About: Persistence.

Batsd grew out of usage at 37signals, where it has been used for the last year. An earlier form was inspired by quasor.
