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
