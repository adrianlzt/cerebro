package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("vim-go")
	x, err := os.ReadFile("/proc/3778779/cmdline")
	if err != nil {
		panic(err)
	}
	for i := 0; i < len(x); i++ {
		if x[i] == 0 {
			x[i] = ' '
		}
	}

	scanfString := "/usr/bin/docker-proxy -proto tcp -host-ip %s -host-port %d -container-ip %s -container-port %d"
	var srcIp, dstIp string
	var srcPort, dstPort uint32

	fmt.Printf("%s\n", x)
	_, err = fmt.Sscanf(string(x), scanfString, &srcIp, &srcPort, &dstIp, &dstPort)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s:%d -> %s:%d\n", srcIp, srcPort, dstIp, dstPort)
}
