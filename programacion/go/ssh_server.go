package main

import (
	"errors"
	"io"
	"io/ioutil"
	"log"
	"net"
	"os/exec"
	"strings"
	"sync"

	"github.com/kr/pty"

	"golang.org/x/crypto/ssh"
)

func main() {
	c := &ssh.ServerConfig{
		NoClientAuth: true,
	}

	keyBytes, err := ioutil.ReadFile("key")
	if err != nil {
		log.Fatalf("key read file: %v", err)
	}
	key, err := ssh.ParsePrivateKey(keyBytes)
	if err != nil {
		log.Fatalf("key parse: %v", err)
	}
	c.AddHostKey(key)

	listener, _ := net.Listen("tcp", "0.0.0.0:2200")
	for {
		tcpConn, _ := listener.Accept()
		_, chans, reqs, _ := ssh.NewServerConn(tcpConn, c)
		go ssh.DiscardRequests(reqs)
		go handleChannels(chans)
	}
}

func handleChannels(chans <-chan ssh.NewChannel) {
	for newChannel := range chans {
		go handleChannel(newChannel)
	}
}

func handleChannel(newChannel ssh.NewChannel) {
	log.Println("handleChannel")
	channel, requests, _ := newChannel.Accept()
	for req := range requests {
		switch req.Type {
		case "shell":
			handleShell(channel, req)
		case "exec":
			handleExec(channel, req)
		default:
			log.Printf("unsupported req type: %s\n", req.Type)
		}
	}
}

func handleShell(c ssh.Channel, r *ssh.Request) {
	executeCommand("bash", []string{}, c)
}

func handleExec(c ssh.Channel, r *ssh.Request) {
	log.Println("handleExec")
	var payload struct {
		Command string
	}

	err := ssh.Unmarshal(r.Payload, &payload)
	if err != nil {
		log.Printf("Could not unmarshal payload: %s.\n", err)
		return
	}

	name, args, err := parsePayload(payload.Command)
	if err != nil {
		log.Printf("Payload has no valid command: %s.\n", err)
		return
	}

	c.Stderr().Write([]byte("mensaje de error que queremos ver"))
	return

	if name == "scp" {
		executeSCP(name, args, c)
	} else {
		executeCommand(name, args, c)
	}
}

func executeSCP(name string, args []string, c ssh.Channel) {
	cmd := exec.Command(name, args...)
	stdin, err := cmd.StdinPipe()
	if err != nil {
		log.Printf("Could not open stdin pipe of command: %s\n", err)
	}

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log.Printf("Could not open stdout pipe of command: %s\n", err)
	}

	close := func() {
		c.Close()
	}

	var once sync.Once
	buf := make([]byte, 100)
	go func() {
		for {
			n, err := c.Read(buf)
			if err != nil && err != io.EOF {
				log.Fatalf("error ReadFile: %v", err)
			}
			if n == 0 {
				break
			}
			log.Printf("buf client -> server: %v\n", string(buf))
			log.Printf("buf client -> server: %v\n", buf)

			if _, err := stdin.Write(buf[:n]); err != nil {
				log.Fatalf("error WriteFile: %v", err)
			}
		}
		//io.Copy(stdin, c)
		once.Do(close)
	}()
	go func() {
		for {
			n, err := stdout.Read(buf)
			if err != nil && err != io.EOF {
				log.Fatalf("error ReadFile: %v", err)
			}
			if n == 0 {
				break
			}
			log.Printf("buf server -> client: %v\n", string(buf))
			log.Printf("buf server -> client: %v\n", buf)

			if _, err := c.Write(buf[:n]); err != nil {
				log.Fatalf("error WriteFile: %v", err)
			}
		}
		//io.Copy(c, stdout)
		once.Do(close)
	}()
	cmd.Run()
}

func executeCommand(name string, args []string, c ssh.Channel) {
	cmd := exec.Command(name, args...)

	cmdChannel, err := pty.Start(cmd)
	if err != nil {
		log.Printf("Could not start pty %s", err)
		c.Close()
		return
	}

	close := func() {
		c.Close()
	}

	var once sync.Once
	go func() {
		io.Copy(c, cmdChannel)
		once.Do(close)
	}()
	go func() {
		io.Copy(cmdChannel, c)
		once.Do(close)
	}()
}

func parsePayload(command string) (string, []string, error) {
	parts := strings.Split(command, " ")

	if len(parts) < 1 {
		return "", nil, errors.New("No command in payload: " + command)
	}

	if len(parts) < 2 {
		return parts[0], []string{}, nil
	}

	return parts[0], parts[1:], nil
}
