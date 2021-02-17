//
// ssh.go
// Copyright (C) 2016 Adrián López Tejedor <adrianlzt@gmail.com>
//
// Distributed under terms of the GNU GPLv3 license.
//

package main

import (
	"fmt"
	"bytes"
	"io/ioutil"
	"log"
	"time"
	"golang.org/x/crypto/ssh"
)

func main() {
	// A public key may be used to authenticate against the remote
	// server by using an unencrypted PEM-encoded private key file.
	//
	// If you have an encrypted private key, the crypto/x509 package
	// can be used to decrypt it.
	// IMPORTANTE! ioutil deprectaed usar io
	key, err := ioutil.ReadFile("/home/adrian/.ssh/id_rsa")
	if err != nil {
		log.Fatalf("unable to read private key: %v", err)
	}

	// Create the Signer for this private key.
	signer, err := ssh.ParsePrivateKey(key)
	if err != nil {
		log.Fatalf("unable to parse private key: %v", err)
	}

	config := &ssh.ClientConfig{
		User: "adrian",
		Auth: []ssh.AuthMethod{
			// Use the PublicKeys method for remote authentication.
			ssh.PublicKeys(signer),
		},
		Timeout: time.Duration(2 * time.Second),
	}

	client, err := ssh.Dial("tcp", "nombrehost:22", config)
	if err != nil {
		panic("Failed to dial: " + err.Error())
	}

	// Each ClientConn can support multiple interactive sessions,
	// represented by a Session.
	session, err := client.NewSession()
	if err != nil {
		panic("Failed to create session: " + err.Error())
	}
	defer session.Close()

	// Once a Session is created, you can execute a single command on
	// the remote side using the Run method.
	var b bytes.Buffer
	session.Stdout = &b
	if err := session.Run("/usr/bin/whoami"); err != nil {
		panic("Failed to run: " + err.Error())
	}
	fmt.Println(b.String())
}
