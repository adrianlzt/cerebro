https://wiki.archlinux.org/title/Systemd-timesyncd

Mostrar config.
También muestra el NTPMessage, donde vemos la situación actual:
timedatectl show-timesync --all

Solo el NTPMessage
timedatectl show-timesync -p NTPMessage


Mostrar el NTPMessage parseado
timedatectl timesync-status


uuuuittayttttbtt

u (uint32) leap
u (uint32) version
u (uint32) mode
u (uint32) stratum
i (int32) precision
t (uint64) root_delay
t (uint64) root_dispersion
a (array)
y reference.str
t (uint64) origin
t (uint64) recv
t (uint64) trans
t (uint64) dest
b (boolean) spike
t (uint64) packet_count
t (uint64) jitter


Offset (https://github.com/systemd/systemd/blob/main/src/timedate/timedatectl.c#L392)
*  Originate Timestamp     T1   time request sent by client
*  Receive Timestamp       T2   time request received by server
*  Transmit Timestamp      T3   time reply sent by server
*  Destination Timestamp   T4   time reply received by client
t = ((T2 - T1) + (T3 - T4)) / 2
