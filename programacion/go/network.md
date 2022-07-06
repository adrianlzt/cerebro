# Calcular numero de IPs libres en una red
cidr := "62.76.47.12/24"
_, net, err := net.ParseCIDR(cidr)
if err != nil {
  panic(err)
}
ones, bits := net.Mask.Size()
freeIPs := math.Pow(2, float64(bits)-float64(ones))-2
fmt.Println("numero de ips libres:", freeIPs)


SplitHostPort
SplitHostPort splits a network address of the form "host:port" into host and port

net.JoinHostPort


# Máscaras de red
Si tenemos un CIDR (192.168.1.0/24) podemos usar ParseCIDR.

Si tenemos una máscara (255.255.255.0) podemos usar:
myNetwork := net.IPNet{IP:net.ParseIP("10.2.3.99"), Mask: net.IPMask(net.ParseIP("255.255.255.0"))}

Para obtener la base address de la red (10.2.3.0):
myNetwork.IP.Mask(myNetwork.Mask)



# Obtener conexiones de una máquina linux
https://github.com/weaveworks/tcptracer-bpf
eBPF program using kprobes to trace TCP events without run-time compilation dependencies

https://github.com/weaveworks/procspy
Go methods to list TCP connections and the owning processes.



# Escuchar todas las conex tcp/udp
Ejemplo tonto donde se cierra un programa si se detectan intentos de conex TCP en puertos no esperados
https://gist.github.com/adrianlzt/69b25104529684f9eaf7c33462deedac
