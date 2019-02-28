//
// test.go
// Copyright (C) 2018 Adrián López Tejedor <adrianlzt@gmail.com>
//
// Distributed under terms of the GNU GPLv3 license.
//

package main

import (
	"fmt"

	zabbix "github.com/cavaliercoder/go-zabbix"
)

type Item struct {
	ItemID    string `json:"itemid"`
	LastValue string `json:"lastvalue"`
}

type Request struct {
	Output []string      `json:"output"`
	Search SearchRequest `json:"search"`
}

type SearchRequest struct {
	Key string `json:"key_"`
}

func main() {
	zbxSession, err := zabbix.NewSession("http://zabbix/api_jsonrpc.php", "Admin", "zabbix")
	if err != nil {
		panic(err)
	}

	items := make([]Item, 0)

	searchRequest := SearchRequest{
		Key: "zabbix[process,trapper,avg,busy]",
	}

	request := Request{
		Output: []string{"extend", "itemid", "lastvalue"},
		Search: searchRequest,
	}

	zbxSession.Get("item.get", request, &items)

	for _, item := range items {
		if item.LastValue != "0" {
			fmt.Printf("%v: %v\n", item.ItemID, item.LastValue)
		}
	}
}
