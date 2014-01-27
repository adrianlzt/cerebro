collectd-processes
==================

Collectd plugin to obtain info of all running processes

Configuration snip to collectd.conf

```
LoadPlugin python
<Plugin python>
       ModulePath "/path/where/processes/is"
       Import "processes"
</Plugin>
```
