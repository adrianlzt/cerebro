<https://www.postgresql.org/docs/current/monitoring-stats.html#:~:text=Table%C2%A027.4.%C2%A0Wait%20Event%20Types>

Ver por qué los procesos están parados, que evento de wait les retiene.

```sql
SELECT pid, wait_event_type, wait_event FROM pg_stat_activity WHERE wait_event is NOT NULL;
```

Algunos que veo que suelen aparecer:
IO - DataFileRead: Waiting for a read from a relation data file.
IO - DataFileWrite: Waiting for a write to a relation data file.
LWLock - WALInsert: Waiting to insert WAL data into a memory buffer.
LWLock - BufferContent: Waiting to access a data page in memory.
IPC - MessageQueueSend: Waiting to send bytes to a shared message queue.
