https://www.postgresql.org/docs/current/app-pgrewind.html

pg_rewind is a tool for synchronizing a PostgreSQL cluster with another copy of the same cluster, after the clusters' timelines have diverged. A typical scenario is to bring an old primary server back online after failover as a standby that follows the new primary.

PGPASSWORD=XXX pg_rewind --dry-run -D data/ --source-server='user=postgres host=172.30.1.2 port=5432 sslmode=prefer'
