//
// markdown.go
// Copyright (C) 2016 Adrián López Tejedor <adrianlzt@gmail.com>
//
// Distributed under terms of the GNU GPLv3 license.
//

package main

import (
  "github.com/miekg/mmark"
  "fmt"
  "flag"
  "io/ioutil"
)

func main() {
  var input_file = flag.String("input", "input.md", "Input markdown file")
  var output_file = flag.String("output", "output.html", "Output markdown file")

  // Read file
  input, err := ioutil.ReadFile(*input_file)
  if err != nil {
    panic(err)
  }

  htmlFlags := 0
  css := ""
  head := ""
  renderer := mmark.HtmlRenderer(htmlFlags, css, head)

	// set up options
	extensions := 0
	extensions |= mmark.EXTENSION_TABLES
	extensions |= mmark.EXTENSION_FENCED_CODE
	extensions |= mmark.EXTENSION_AUTOLINK
	extensions |= mmark.EXTENSION_SPACE_HEADERS
	extensions |= mmark.EXTENSION_CITATION
	extensions |= mmark.EXTENSION_TITLEBLOCK_TOML
	extensions |= mmark.EXTENSION_HEADER_IDS
	extensions |= mmark.EXTENSION_AUTO_HEADER_IDS
	extensions |= mmark.EXTENSION_UNIQUE_HEADER_IDS
	extensions |= mmark.EXTENSION_FOOTNOTES
	extensions |= mmark.EXTENSION_SHORT_REF
	extensions |= mmark.EXTENSION_INCLUDE
	extensions |= mmark.EXTENSION_PARTS
	extensions |= mmark.EXTENSION_ABBREVIATIONS
	extensions |= mmark.EXTENSION_DEFINITION_LISTS
  output := mmark.Parse(input, renderer, extensions).Bytes()

  err = ioutil.WriteFile(*output_file, output, 0644)
  if err != nil {
    panic(err)
  }

  fmt.Printf("Fichero %v generado\n", *output_file)
}
