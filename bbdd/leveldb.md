https://code.google.com/p/leveldb/

LevelDB is a fast key-value storage library written at Google that provides an ordered mapping from string keys to string values.

LevelDB doesn’t support hot backups. If you want to do a safe backup of the database, you have to close it and then copy it. The LevelDB variants RocksDB and HyperLevelDB fix this problem 

In LSM Trees a delete is as expensive, if not more so, than a write. A delete will write a new record known as a tombstone. After that queries will merge the result set with any tombstones to clear out the deletes. Later, a compaction will run that will remove the tombstone and the underlying record from the SSTable file.
