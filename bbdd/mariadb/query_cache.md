Stores SELECT queries and their results sets.

Re-issue the same query, even from a different client and the cached result is returned.

Useful for high read, low write environments.

Changes to underlying table data cause relevant queries to be removed from the cache

Can be controlled on a per query basis:
  SELECT SQL_CACHE * FROM ...
  SELECT SQL_NO_CACHE * FROM ...
