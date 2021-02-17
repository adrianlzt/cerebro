// Based on https://gist.github.com/mattetti/5914158
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"time"
)

type Response struct {
	Jid     string `json:"jid,omitempty"`
	Bit     string `json:"bit,omitempty"`
	Success bool   `json:"success"`
}

// Creates a new file upload http request with optional extra params
func newfileUploadRequest(uri string, params map[string]string, paramName, path string) (*http.Request, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile(paramName, filepath.Base(path))
	if err != nil {
		return nil, err
	}
	_, err = io.Copy(part, file)

	for key, val := range params {
		_ = writer.WriteField(key, val)
	}
	err = writer.Close()
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", uri, body)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	return req, err
}

func wait_for_success(jid string, link_chan chan string) {
	check_url := fmt.Sprintf("http://funkyimg.com/upload/check/%v", jid)
	var body_json Response

	for {
		response, _ := http.Get(check_url)
		// IMPORTANTE! ioutil deprectaed usar io
		body, _ := ioutil.ReadAll(response.Body)
		err := json.Unmarshal(body, &body_json)
		if err != nil {
			log.Fatal(err)
		}
		response.Body.Close()
		if body_json.Success {
			break
		}
		time.Sleep(100 * time.Millisecond)
	}

	re := regexp.MustCompile("http://funkyimg.com/i/[^\"]*")
	link_chan <- re.FindString(body_json.Bit)
}

func main() {
	if len(os.Args) != 2 {
		fmt.Printf("Usage: funkyimg image_file")
		return
	}

	file := os.Args[1]
	if _, err := os.Stat(file); err != nil {
		log.Fatalf("File '%v' does not exists", file)
		return
	}

	extraParams := map[string]string{}
	request, err := newfileUploadRequest("http://funkyimg.com/upload/", extraParams, "images", file)
	if err != nil {
		log.Fatal(err)
	}
	client := &http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer resp.Body.Close()

	// IMPORTANTE! ioutil deprectaed usar io
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
		return
	}

	var body_json Response
	err = json.Unmarshal(body, &body_json)
	if err != nil {
		log.Fatal(err)
		return
	}

	if !body_json.Success {
		log.Fatalf("Error posting image\nStatus Code: %v\nBody: %v", resp.StatusCode, string(body))
		return
	}

	link_chan := make(chan string)
	go wait_for_success(body_json.Jid, link_chan)
	select {
	case link := <-link_chan:
		fmt.Printf("%v\n", link)
	case <-time.After(4 * time.Second):
		fmt.Printf("Desisto tras 4 seg")
	}
}
