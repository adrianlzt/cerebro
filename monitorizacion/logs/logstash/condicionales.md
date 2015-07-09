if EXPRESSION {
  ...
} else if EXPRESSION {
  ...
} else {
  ...
}


if "metrics" in [tags] {


Ej.:

output {
  if [type] == "web" and [request] == "/" {
    if [response][status] =~ /^5\d\d/ {
      nagios {...}
    } else if [response][status] =~ /^4\d\d/ {
      elasticsearch {...}
    }
    statsd { increment => "apache.${status}" }
  }
}
