https://golang.org/pkg/os/

mirar tambien ioutil.md

file, err := os.Open("file.go") // For read access.
if err != nil {
	log.Fatal(err)
}
