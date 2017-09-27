package main

import (
	"fmt"

	"github.com/adrianlzt/go-systemd/sdjournal"
)

func main() {
	jor, err := sdjournal.NewJournal()
	if err != nil {
		panic(err)
	}

	m := sdjournal.Match{
		Field: sdjournal.SD_JOURNAL_FIELD_SYSLOG_IDENTIFIER,
		Value: "opencloud", // ${APPNAME}.service
	}
	err = jor.AddMatch(m.String())
	if err != nil {
		panic(err)
	}

	cursorInicio := "s=d3d31664f98e415a823ecd3ba5d94751;i=243c9;b=c53e12954f424ce39f9cb07493574f96;m=30e1ef7ce9;t=55a2f77d35255;x=84bb0adc41a85f73"

	err = jor.SeekCursor(cursorInicio)
	if err != nil {
		panic(err)
	}

	n, err := jor.NextSkip(1)
	if err != nil {
		panic(err)
	}
	fmt.Printf("next: %v\n", n)

	n, err = jor.NextSkip(1)
	if err != nil {
		panic(err)
	}
	fmt.Printf("second next: %v\n", n)

	c, err := jor.GetCursor()
	if err != nil {
		panic(err)
	}
	fmt.Printf("cursor: %v\n", c)

	n, err = jor.Next()
	if err != nil {
		panic(err)
	}
	fmt.Printf("next: %v\n", n)

	c, err = jor.GetCursor()
	if err != nil {
		panic(err)
	}
	fmt.Printf("cursor: %v\n", c)

	testCursor1 := jor.TestCursor(c)
	fmt.Println(testCursor1) // nil porque c es nuestra posicion actual

	testCursor2 := jor.TestCursor(cursorInicio)
	fmt.Println(testCursor2) // error porque no estamos en cursorInicio

	e, err := jor.GetEntry()
	if err != nil {
		panic(err)
	}
	fmt.Printf("entry: %v\n", e)
}
