https://metrics.librato.com/

Enviar métricas a una web y ver las gráficas allí

Librato Metrics provides a fantastic way of storing arbitrary time series data. We’re already storing lots of data in New Relic but Metrics provides us with less opinionated software so we can use it for anything, for instance number of logins or searches or other business level metrics. We’ll go for a plan with 200 data sources, 100 metrics each and at 10 second resolution for a cost of $3,860 per month.

Hay conectores para lenguajes, etc.: http://support.metrics.librato.com/knowledgebase/articles/122270-collection-agents

Lo más básico, con un POST
curl -u pepe@gmail.com:7bf920e861898072d08d388592dc6fc10913c5642a34aa9cb1d9580ea44d8ef0 -d 'measure_time=1380724174' -d 'source=test' -d 'counters[0][name]=prueba' -d 'counters[0][value]=5' -X POST https://metrics-api.librato.com/v1/metrics


Convertir fichero de log a trazas para el librato

# cat mod_gearman_neb.log | awk '{FS="]"; print $1;}' | uniq -c |  tr -d "[" > gearman1
# cat gearman1  | gawk '{
split($2, d, "-")
split($3, t, ":")
epoch = mktime(d[1] " " d[2] " " d[3] " " t[1] " " t[2] " " t[3])
print epoch, $1
}' >> gearman2

# cat gearman2 | awk '{print "curl -u pepe@gmail.com:7bf920e861898072d08d388592dc6fc10913c5642a34aa9cb1d9580ea44d8ef0 -d \"measure_time="$1 "\" -d \"source=test\" -d \"counters[0][name]=PRUEBA\" -d \"counters[0][value]="$2"\" -X POST https://metrics-api.librato.com/v1/metrics";}' > posts

curl -u pepe@gmail.com:7bf920e861898072d08d388592dc6fc10913c5642a34aa9cb1d9580ea44d8ef0 -d "measure_time=1380713061" -d "source=test" -d "counters[0][name]=COSAS" -d "counters[0][value]=53" -X POST https://metrics-api.librato.com/v1/metrics
