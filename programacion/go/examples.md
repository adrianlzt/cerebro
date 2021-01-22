https://blog.golang.org/examples
Como tests pero para probar que el stdout es lo que esperamos:

package stringutil_test

import (
    "fmt"

    "github.com/golang/example/stringutil"
)

func ExampleReverse() {
    fmt.Println(stringutil.Reverse("hello"))
    // Output: olleh
}
