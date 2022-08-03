// https://able8.medium.com/golang-measuring-execution-time-using-a-deferred-function-5ea18b95f163
package main

import (
	"fmt"
	"time"
)

func main() {
	defer MeasureTime("Task One")()
	time.Sleep(time.Second * 3)
	fmt.Println("End")
}

func MeasureTime(process string) func() {
	fmt.Printf("Start %s\n", process)
	start := time.Now()
	return func() {
		fmt.Printf("Time taken by %s is %v\n", process, time.Since(start))
	}
}
