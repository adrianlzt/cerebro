http://cabotapp.com/
https://github.com/arachnys/cabot

Cabot is a free, open-source, self-hosted infrastructure monitoring platform that provides some of the best features of PagerDuty, Server Density, Pingdom and Nagios without their cost and complexity. (Nagios, I'm mainly looking at you.)

It provides a web interface that allows you to monitor services (e.g. "Stage Redis server", "Production ElasticSearch cluster") and send telephone, sms or hipchat/email alerts to your on-duty team if those services start misbehaving or go down - all without writing a line of code. Best of all, you can use data that you're already pushing to Graphite/statsd to generate alerts, rather than implementing and maintaining a whole new system of data collectors.

You can alert based on:

Metrics from Graphite
Status code and response content of web endpoints
Jenkins build statuses
We built Cabot as a Christmas project at Arachnys because we couldn't wrap our heads around Nagios, and nothing else out there seemed to fit our use case. We're open-sourcing it in the hope that others find it useful.

Cabot is written in Python and uses Django, Bootstrap, Font Awesome and a whole host of other goodies under the hood.
