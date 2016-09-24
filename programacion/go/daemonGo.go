package main

import (
    "log"
    "os"
    "os/exec"
    "syscall"
		"time"
		"fmt"
)

func main() {
    // check command line flags, configuration etc.

    // short delay to avoid race condition between os.StartProcess and os.Exit
    // can be omitted if the work done above amounts to a sufficient delay
    err := syscall.FcntlFlock(os.Stdout.Fd(), syscall.F_SETLKW, &syscall.Flock_t{
        Type: syscall.F_WRLCK, Whence: 0, Start: 0, Len: 0 })
    if err != nil {
        log.Fatalln("Failed to lock stdout:", err)
    }

    if os.Getppid() != 1 {
        // I am the parent, spawn child to run as daemon
        binary, err := exec.LookPath(os.Args[0])
        if err != nil {
            log.Fatalln("Failed to lookup binary:", err)
        }
        _, err = os.StartProcess(binary, os.Args, &os.ProcAttr{Dir: "", Env: nil,
                Files: []*os.File{os.Stdin, os.Stdout, os.Stderr}, Sys: nil})
        if err != nil {
            log.Fatalln("Failed to start process:", err)
        }

				fmt.Println("Escribiendo en /tmp/go.daemon")
        os.Exit(0)
    } else {
        // I am the child, i.e. the daemon, start new session and detach from terminal
        _, err := syscall.Setsid()
        if err != nil {
            log.Fatalln("Failed to create new session:", err)
        }
        file, err := os.OpenFile("/dev/null", os.O_RDWR, 0)
        if err != nil {
            log.Fatalln("Failed to open /dev/null:", err)
        }
        syscall.Dup2(int(file.Fd()), int(os.Stdin.Fd()))
        syscall.Dup2(int(file.Fd()), int(os.Stdout.Fd()))
        syscall.Dup2(int(file.Fd()), int(os.Stderr.Fd()))
        file.Close()
    }

    // daemon business logic starts here
		f, err := os.OpenFile("/tmp/go.daemon", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
		if err != nil {
		    panic(err)
		}

		defer f.Close()

    for {
				now := time.Now()
        text := fmt.Sprint(now.Format(time.UnixDate), "\n")
				if _, err = f.WriteString(text); err != nil {
				    panic(err)
				}
				time.Sleep(2 * time.Second)
		}
}
