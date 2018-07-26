https://www.elastic.co/products/upgrade_guide
Formulario que te ayuda a saber como actualizar


Las versiones major pueden usar índices de la anterior major version, pero no anteriores.

Depende del upgrade podremos hacer rolling upgrade (sin downtime) o full cluster restart (some downtime)
Generalmente los rolling upgrade solo serán para minor y patch versions, aunque puede que se permitan rolling updates desde la última major.minor hacia la siguiente major
Esto pasa por ejemplo para 5.6 -> 6.0 (pero puede que no suceda en el futuro)


# Rolling upgrade
https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html

To perform a rolling restart:
0. Backup
1. stop non-essential indexing (if possible)
2. disable shard allocation
   PUT _cluster/settings{
     "transient": {
       "cluster.routing.allocation.enable": "none"
     }
   }
   POST _flush/synced
3. stop and update one node
4. start the node
5. re-enable shard allocation and wait
   PUT _cluster/settings{
     "transient": {
       "cluster.routing.allocation.enable": "all"
     }
   }
   Esperar que el cluster este green de nuevo
   GET _cat/health
6. GOTO step 2 (until all nodes are updated)



# Full cluster restart
Parecido al rolling

0. backup
1.stop indexing (e.g. disable writes, or make ES unreachable)
2.disable shard allocation
3.perform a synced flush
4.shutdown and update all nodes
DOWNTIME HERE!
5.start all dedicated master nodes
  esperar hasta la que se haya hecho la elección
6.start the other nodes
7.wait for yellow
8.reenable shard allocation
