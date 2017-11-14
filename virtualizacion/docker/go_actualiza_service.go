//
// Coge como parametro el nombre de un servicio y le pide a swarm que lo reinicie
// Espera hasta que el servicio se haya redesplegado correctamente
//
package main

import (
	"flag"
	"fmt"
	"time"

	"github.com/fsouza/go-dockerclient"
)

var (
	service = flag.String("service", "", "Servicio que reiniciar")
)

func main() {
	flag.Parse()

	if *service == "" {
		flag.Usage()
		panic("-service es obligatorio")
	}

	endpoint := "unix:///var/run/docker.sock"
	client, err := docker.NewClient(endpoint)
	if err != nil {
		panic(err)
	}

	// Obtenemos el service, necesitamos su spec para poder actualizarlo
	serviceDef, err := client.InspectService(*service)
	if err != nil {
		panic(err)
	}

	// Tenemos que incrementar el parametro force para poder actualizar el service
	serviceDef.Spec.TaskTemplate.ForceUpdate += 1

	err = client.UpdateService("test_test", docker.UpdateServiceOptions{ServiceSpec: serviceDef.Spec, Version: serviceDef.Version.Index})
	if err != nil {
		panic(err)
	}

	fmt.Printf("Solicitada actualizacion del service test_test.\nComprobando si la actualizacion se ha realizado")

	for i := 0; i < 100; i++ {
		serviceDef, err = client.InspectService(*service)
		if err != nil {
			panic(err)
		}

		if serviceDef.UpdateStatus != nil && serviceDef.UpdateStatus.State == "completed" {
			break
		}

		fmt.Printf(".")
		time.Sleep(1 * time.Second)
	}
	fmt.Printf("\nService test_test actualizado\n")
}
