import "fmt"
import "os"
import "bufio"

reader := bufio.NewReader(os.Stdin)
fmt.Print("Enter text: ")
text, _ := reader.ReadString('\n')  // lee hasta que encuentre '\n', text contendrá el delimitador
// podemos usar strings.TrimSpace(text) para eliminar caracteres en blanco, y el new line, del final
fmt.Println(text)
