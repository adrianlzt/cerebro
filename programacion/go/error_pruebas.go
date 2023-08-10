package main

import (
	"errors"
	"fmt"
)

var (
	errFoo     = fmt.Errorf("err-foo")
	errStepOne = errStep{StepName: "one"}
	errStepTwo = errStep{StepName: "two"}
)

type errStep struct {
	StepName string
	error
}

func (e errStep) Error() string {
	return fmt.Sprintf("err-stepOne: %v", e.StepName)
}

type errOther struct{}

func (e errOther) Error() string {
	return fmt.Sprintf("err-Other")
}

func main() {
	_, err := bar()
	if err != nil {
		// Comprobamos que en "err" tenemos el error errStepOne
		if errors.Is(err, errStepOne) {
			fmt.Printf("encontrado un error en el primer paso: %v\n\n", err)
		}

		// Comprobamos que en "err" tenemos el tipo de error errStep
		if errors.As(err, &errStep{}) {
			fmt.Printf("el error es de tipo %T, dentro matchea con As errStep\n\n", err)
		}

		// Comprobamos que en "err" tenemos el error errFoo
		if errors.Is(err, errFoo) {
			fmt.Printf("%v encontrado\n\n", errFoo)
		}

		// Comprobamos que en "err" NO tenemos el tipo de error errOther
		if !errors.As(err, &errOther{}) {
			fmt.Printf("En err no tenemos el tipo de error errOther\n\n")
		}
	}
}

func bar() (int, error) {
	err1 := foo()
	err2 := foo()

	result := errors.Join(
		fmt.Errorf("%w: %w", errStepOne, err1),
		err2,
	)

	return 0, result
}

func foo() error {
	return errFoo
}
