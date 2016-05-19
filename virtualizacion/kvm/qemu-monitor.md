http://kashyapc.com/2013/03/31/multiple-ways-to-access-qemu-machine-protocol-qmp/

Para obtener datos de una instancia

virsh qemu-monitor-command instance-00008c4e '{"execute":"query-kvm"}'

Lista de comandos:
virsh qemu-monitor-command instance-00008c4e --hmp --cmd help


http://git.qemu.org/?p=qemu.git;a=blob_plain;f=scripts/qmp/qmp-shell;h=e0e848bc30954248abb610779e5a872ffd5c3303;hb=HEAD
qmp-shell.py
Necesita:
pip install qmp
