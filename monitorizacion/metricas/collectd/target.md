https://collectd.org/wiki/index.php/Target:Write

En collectd 5 me pide que mande el output al menos a un write plugin.

Si solo tengo puesto que escriba a rrd, tendré que decirle esto a collectd:

<Target "write">
  Plugin "rrdtool"
</Target>
