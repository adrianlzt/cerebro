# select id, case id when 1 then 'uno' when 2 then 'dos' else 'no se' end as txt from projects;
 id |  txt
----+-------
  1 | uno
  2 | dos
  3 | no se


select case (select pg_is_in_recovery()) when true then null else count(*) end from pg_stat_replication;
