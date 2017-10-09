//
// main.go
// Copyright (C) 2017 Adrián López Tejedor <adrianlzt@gmail.com>
//
// Distributed under terms of the GNU GPLv3 license.
//

package main

import (
	"fmt"
	netgo "net"
	"time"

	"github.com/shirou/gopsutil/net"
)

func main() {
	netio, err := net.IOCounters(true)
	if err != nil {
		panic(fmt.Sprintf("error getting net io info: %s", err))
	}

	for _, io := range netio {
		t0 := time.Now()
		iface, err := netgo.InterfaceByName(io.Name)
		if err != nil {
			continue
		}
		t1 := time.Now()

		if iface.Flags&netgo.FlagLoopback == netgo.FlagLoopback {
			continue
		}

		if iface.Flags&netgo.FlagUp == 0 {
			continue
		}

		fields := map[string]interface{}{
			"bytes_sent":   io.BytesSent,
			"bytes_recv":   io.BytesRecv,
			"packets_sent": io.PacketsSent,
			"packets_recv": io.PacketsRecv,
			"err_in":       io.Errin,
			"err_out":      io.Errout,
			"drop_in":      io.Dropin,
			"drop_out":     io.Dropout,
		}
		fmt.Printf("(%v) Interface %v: %v\n", t1.Sub(t0), io.Name, fields)
	}
}
