package main

import (
	"flag"
	"fmt"

	"k8s.io/klog"
	"k8s.io/klog/klogr"
)

var (
	version = "0.0.0"
)

func main() {
	klog.InitFlags(nil)
	flag.Set("stderrthreshold", "INFO")
	flag.Set("v", "2")

	// Flags
	versionFlag := flag.Bool("version", false, "Show version")

	flag.Parse()

	if *versionFlag {
		fmt.Printf("Version: %s\n", version)
		return
	}

	// Logger
	log := klogr.New()

	log.V(1).Info("Hola")
}
