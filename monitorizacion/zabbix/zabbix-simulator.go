// Description: Simulate a Zabbix server to get the data sent by the agents
// https://gitlab.datadope.io/adrian/zabbix-server-simulator

package main

import (
	"encoding/binary"
	"fmt"
	"net"
)

func main() {
	host := "127.0.0.1"
	port := 10051

	// Simulate a Zabbix server to get the data sent
	listener, err := net.Listen("tcp", fmt.Sprintf("%v:%v", host, port))
	if err != nil {
		panic(err)
	}

	fmt.Printf("Listening on %v:%v\n", host, port)

	defer listener.Close()

	for {
		/*
		* Accept packet with the two metrics sent
		 */
		conn, err := listener.Accept()
		if err != nil {
			fmt.Printf("Error accepting: %v", err.Error())
			continue
		}

		fmt.Printf("Accepted connection from %v\n", conn.RemoteAddr())

		// The zabbix output checks that there are not errors
		resp := []byte("failed: 0\n")
		_, err = conn.Write(resp)
		if err != nil {
			fmt.Printf("Error writing: %v", err.Error())
			continue
		}

		// Obtain request from the mock zabbix server
		// Read protocol header and version
		header := make([]byte, 5)
		_, err = conn.Read(header)
		if err != nil {
			fmt.Printf("Error reading header: %v", err.Error())
		}

		// Read data length
		dataLengthRaw := make([]byte, 8)
		_, err = conn.Read(dataLengthRaw)
		if err != nil {
			fmt.Printf("Error reading data length: %v", err.Error())
		}

		dataLength := binary.LittleEndian.Uint64(dataLengthRaw)

		// Read data content
		content := make([]byte, dataLength)
		_, err = conn.Read(content)
		if err != nil {
			fmt.Printf("Error reading data content: %v", err.Error())
		}

		fmt.Println(string(content))

		// Close connection after reading the client data
		conn.Close()
	}
}
