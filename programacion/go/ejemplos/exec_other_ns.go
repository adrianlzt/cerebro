/*
* Execute a command under a different network namespace
 */

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os/exec"

	"github.com/vishvananda/netns"
)

func main() {
	pid := 1302916
	ns, err := netns.GetFromPid(pid)
	if err != nil {
		log.Fatal(err)
	}

	err = netns.Setns(ns, netns.CLONE_NEWNET)
	if err != nil {
		log.Fatal(err)
	}

	cmd := exec.Command("ss", "-atn")
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log.Fatal(err)
	}

	if err := cmd.Start(); err != nil {
		log.Fatal(err)
	}

	out, err := ioutil.ReadAll(stdout)
	if err != nil {
		return
	}

	if err := cmd.Wait(); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s", string(out))
}
