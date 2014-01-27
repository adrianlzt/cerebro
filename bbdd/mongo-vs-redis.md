If you think of a spectrum with Memcached on one end and MySQL or PostgreSQL on the other, MongoDB is closer to the SQLs and Redis is closer to Memcached.

Expanding on that, Redis is designed for all in-memory work and presents a nice set of data structures, much like you'd find in a modern scripting language: scalars, lists, hashes, etc.

MongoDB is about dealing with large amounts of data represented as documents. It comes with all the necessary plumbing to handle sharding across multiple nodes, replication with automatic failover (replica sets), and a rich high-level query language.

Both are incredibly useful but serve different purposes. At craigslist, we use MongoDB for data that will exist forever and Redis for transient data that lives a month or less.
