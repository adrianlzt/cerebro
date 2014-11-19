Con check_mk multisite, si un check no recibe información en 1.5 (definible en Global configuration -> Status GUI (Multisite) -> Staleness value to mark hosts / services stale) timeperiods, se marca como stale.
http://git.mathias-kettner.de/git/?p=check_mk.git;a=blob;f=livestatus/src/ServiceSpecialDoubleColumn.cc;h=b80ba8720588ed776405093ed0390b9c39a0166c;hb=HEAD

Esta funcionalidad es cosa de check_mk, nada tiene que ver icinga.
Para hacerlo con icinga debemos usar freshness

Para preguntar por el stale de un servico a livestatus:
# nc -U /var/spool/icinga/cmd/live
GET services
Columns: host_name service_description staleness
Filter: host_name ~ ^jetsetme
Limit: 10


Para ver los que fallan:
Filter: staleness > 1.5

