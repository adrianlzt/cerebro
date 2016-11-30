https://github.com/IzakMarais/reporter

Service that genereates a PDF report from a Grafana dashboard


# Instalar
go get github.com/izakmarais/reporter/...
go install -v github.com/izakmarais/reporter/cmd/grafana-reporter

whereis grafana-reporter

yum install texlive


# Dudas
Si dos dashboards se llaman igual, de que orga lo coge?

# Dev
cd ~/.gvm/pkgsets/go1.6.2/global/src/github.com/izakmarais/reporter
go run cmd/grafana-reporter/* -ip influxdb-int.hi.inet:80

Si usamos src/github.com/adrianlzt/reporter tendremos que cambiar los import de izakmarais por adrianlzt



curl "http://localhost:8686/api/report/test?apitoken=eyJrIjoiQ1BxNXNEWFVDRk5Td0MwVUdhYmZuWHRYTDdMdERhZEUiLCJuIjoicmVwb3J0ZXIiLCJpZCI6Mjl9" > /tmp/2.pdf

El apitoken va asociado a una orga

curl "http://localhost:8686/api/report/test?apitoken=eyJrIjoiQ1BxNXNEWFVDRk5Td0MwVUdhYmZuWHRYTDdMdERhZEUiLCJuIjoicmVwb3J0ZXIiLCJpZCI6Mjl9&template=telefonica"

curl -H "Authorization: Bearer eyJrIjoiQ2M2dUQxRDFKaGJtTHQ4NFV4SW1sc0ljNERqejFKV2YiLCJuIjoicmVwb3J0ZXJfYWRtaW4iLCJpZCI6Mjl9" "http://influxdb-int.hi.inet/render/dashboard-solo/db/test?from=now-1h&panelId=4&theme=light&to=now&height=1000&width=1000" > /tmp/1.png && open /tmp/1.png


curl "http://localhost:8686/api/report/test?apitoken=eyJrIjoiQ1BxNXNEWFVDRk5Td0MwVUdhYmZuWHRYTDdMdERhZEUiLCJuIjoicmVwb3J0ZXIiLCJpZCI6Mjl9&template=telefonica" > /tmp/2.pdf && open /tmp/2.pdf

curl -H "Authorization: Bearer eyJrIjoiQ2M2dUQxRDFKaGJtTHQ4NFV4SW1sc0ljNERqejFKV2YiLCJuIjoicmVwb3J0ZXJfYWRtaW4iLCJpZCI6Mjl9" "http://influxdb-int.hi.inet/api/dashboards/db/test" | jq '.' |less


