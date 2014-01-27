https://github.com/etsy/statsd/

Application & Business Metrics

A network daemon that runs on the Node.js platform and listens for statistics, like counters and timers, sent over UDP and sends aggregates to one or more pluggable backend services (e.g., Graphite).

We used a very similar setup at Kiip, but we ran into scalability issues with Statsd. We ended up writing a pure C based replacement called Statsite, that is drop in compatible but is much faster. It's open sourced here: https://github.com/armon/statsite


############################

https://github.com/quasor/statsd

Ruby statsd
A network daemon for aggregating statistics (counters and timers), rolling them up, then sending them to graphite or mongodb.
