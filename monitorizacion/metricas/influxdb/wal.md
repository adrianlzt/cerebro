Write Ahead Log
https://docs.influxdata.com/influxdb/v0.10/concepts/storage_engine/


It’s possible to disable the persistence of the WAL, instead relying on a regular flush to the index. This would result in the best possible performance at the cost of opening up a window of data loss for unflushed writes.
