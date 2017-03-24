https://github.com/uber-common/cpustat

cpustat - high(er) frequency stats sampling

Cpustat is a tool for Linux systems to measure performance. You can think of it like a fancy sort of "top" that does different things. This project is motived by Brendan Gregg's USE Method and tries to expose CPU utilization and saturation in a helpful way.

# Install
go get github.com/uber-common/cpustat

## Arch
yaourt -S cpustat

falla la instalacion porque fallan los tests
Pero se puede instalar con go get


# Uso
sudo cpustat

Interfaz gráfica
sudo cpustat -t
