https://osquery.io/

osquery (http://osquery.io/) is a new open source tool from Facebook that exposes low level details of your system via a familiar SQL interface. Want to query for processes listening on a given network interface? Or for services that launch at startup? This is the tool for you.

osquery> SELECT uid, name FROM listening_ports l, processes p WHERE l.pid=p.pid;
