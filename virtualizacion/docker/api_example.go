package main

import (
	"bytes"
	"context"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
)

func main() {
	container := flag.String("container", "containername", "Name of the container to exec in")
	flag.Parse()

	cli, err := client.NewEnvClient()
	if err != nil {
		log.Fatalf("Error connecting to docker container")
	}

	dockerClient := DockerClient{
		cli:       cli,
		container: *container,
	}

	log.Println("Listening on :4000")
	http.ListenAndServe(":4000", dockerClient)
}

// DockerClient almacena la conexión al demonio de docker y el nombre del container contra el que ejecutar los comandos
type DockerClient struct {
	cli       *client.Client
	container string
}

func (c DockerClient) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	execConfig := types.ExecConfig{
		Tty:          false,
		AttachStdout: true,
		AttachStderr: true,
		Cmd: []string{
			"hostname",
		},
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	log.Println("ContainerExecCreate")
	respIDExecCreate, err := c.cli.ContainerExecCreate(ctx, c.container, execConfig)
	if err != nil {
		fmt.Fprintf(w, "creating docker exec: %v", err)
		return
	}

	log.Println("ContainerExecAttach")
	respID, err := c.cli.ContainerExecAttach(ctx, respIDExecCreate.ID, types.ExecConfig{})
	if err != nil {
		fmt.Fprintf(w, "docker exec: %v", err)
		return
	}

	stdout := new(bytes.Buffer)
	stderr := new(bytes.Buffer)
	log.Println("Read")
	n, err := stdcopy.StdCopy(stdout, stderr, respID.Reader)
	if err != nil && err != io.EOF {
		fmt.Fprintf(w, "reading docker exec: %v", err)
		return
	}

	if n == 0 {
		fmt.Fprintf(w, "empty response from command")
		return
	}

	if stderr.Len() > 0 {
		fmt.Fprintf(w, "error running command: %v", stderr.String())
		return
	}

	fmt.Fprint(w, stdout.String())
}
