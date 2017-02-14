https://golang.org/pkg/encoding/base64/

msg := "Hello, 世界"
encoded := base64.StdEncoding.EncodeToString([]byte(msg))
fmt.Println(encoded)
decoded, err := base64.StdEncoding.DecodeString(encoded)
if err != nil {
	fmt.Println("decode error:", err)
	return
}
fmt.Println(string(decoded))
