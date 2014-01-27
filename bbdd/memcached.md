http://memcached.org/

What is Memcached?

Free & open source, high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.

Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.

Memcached is simple yet powerful. Its simple design promotes quick deployment, ease of development, and solves many problems facing large data caches. Its API is available for most popular languages.


Ejemplo de uso en programacion/python/memcached-test.py


http://highscalability.com/blog/2013/8/26/reddit-lessons-learned-from-mistakes-made-scaling-to-1-billi.html
Each tool has a different use case. Memcache has no guarantees about durability, but is very fast, so the vote data is stored there to make rendering of pages as quick as possible. Cassandra is durable and fast, and gives fast negative lookups because of its bloom filter, so it was good for storing a durable copy of the votes for when the data isn't in memcache. Postgres is rock solid and relational, so it’s a good place to store votes as a backup for Cassandra (all data in Cassandra could be generated from Postgres if necessary) and also for doing batch processing, which sometimes needed the relational capabilities.
