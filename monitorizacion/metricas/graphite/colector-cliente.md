Writing a client

First you obviously need to decide what data it is you want to graph with graphite. The script examples/example-client.py demonstrates a simple client that sends loadavg data for your local machine to carbon on a minutely basis.

The default storage schema stores data in one-minute intervals for 2 hours. This is probably not what you want so you should create a custom storage schema according to the docs on the graphite wiki (http://graphite.wikidot.com).



Installing Diamond Stats collector

I needed something to quickly and continuously populate graphite with some data, so that I could test some some of the capabilities of graphite. So the easiest option was to install the diamond collector which will collect system stats and populate graphite with the same information. You can clone the Diamond repo from github and build .deb or .rpm files.

# apt-get install python-configobj
# dpkg -i diamond_2.0.0_all.deb
# /etc/init.d/diamond restart
