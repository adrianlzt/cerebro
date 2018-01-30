https://blog.dachary.org/2013/11/16/display-the-default-ceph-configuration/

Dump de la config:
ceph --show-config

The –show-config option can be used to display the config of a running daemon:
ceph -n osd.123 --show-config
