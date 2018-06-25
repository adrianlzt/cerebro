PUT /_cluster/settings
{
 "transient" : {
 "logger.org.elasticsearch.transport.TransportService.tracer" : "TRACE"
 }
}


Recordar poner a INFO cuando terminemos.


Mirar query/profiling.md para descubrir porque una query tarda tanto.


slowlog.md tambien puede ser interesante
