Tracking deployments
  drawAsInfinite(color(custom.instances.*.killed,"white"))
  summarize(sumSeries(group(custom.instances.*.killed)),"id")

Finding the outliers
  mostDeviant(5,runtime.*.load.1m)
  sortByMaxima
  sortByMinima
  limit

Derivada de la trasmisión para calcular velocidad
  scaleToSeconds(nonNegativeDerivate(snmp.IF-MIB::ifInOctets.7),1)

Time shifting
  sumSeries(mail.host.mta-*.messages.in)
  timeShift(sumSeries(mail.host.mta-*.messages.in),"6mon")

Counting metrics
  sumSeries(offset(scale(collectd.*.load.load.longterm,0),1))
 
Hybrid graphs
  alpha(stacked(sumSeries(mail.hosts.mta-*.messages.in)),0.6)

Renaming keys on the fly
  aliasSub(hosts.web-01-pdx-prod-example-com.metric,"-(\w+)-prod", ".\1.prod")

