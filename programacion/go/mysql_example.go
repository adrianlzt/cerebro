package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// Ejemplo genérico de DSN username:password@protocol(address)/dbname?param=value
	db, err := sql.Open("mysql", "root@unix(/var/lib/mysql/mysql.sock)/cinder")
	if err != nil {
		panic(err.Error()) // Just for example purpose. You should use proper error handling instead of panic
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	// Execute the query
	rows, err := db.Query("SELECT updated_at,created_at,topic FROM services;")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	var updated_at, created_at, topic []byte
	for rows.Next() {
		err = rows.Scan(&updated_at, &created_at, &topic)
		if err != nil {
			panic(err.Error()) // Just for example purpose. You should use proper error handling instead of panic
		}
		fmt.Println(string(updated_at), string(created_at), string(topic))
	}
}
