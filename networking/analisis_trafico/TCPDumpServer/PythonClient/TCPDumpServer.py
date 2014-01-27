#!/usr/bin/python
# -*- coding: utf-8 -*-

import dbus

bus = dbus.SystemBus()
tcpdumper = bus.get_object("es.mensaje.tcpdumper", "/")
start = tcpdumper.get_dbus_method("start","local.TCPDumper")
stop = tcpdumper.get_dbus_method("stop","local.TCPDumper")

start("80", "test.dump")
#stop()
