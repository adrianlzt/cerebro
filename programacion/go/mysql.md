https://github.com/Go-SQL-Driver/MySQL/
https://github.com/go-sql-driver/mysql/wiki/Examples
http://go-database-sql.org

mysql_example.go



https://github.com/jmoiron/sqlx
Simplifica el acceso a sql.
Por ejemplo, nos permite pasarle un struct, o array de struct, a una query SELECT y nos rellena el struct/array



http://go-database-sql.org/varcols.html
Si no sabemos el número de columnas que nos devuelve SELECT
https://stackoverflow.com/questions/29102725/go-sql-driver-get-interface-column-values


// Retorna los datos obteniedos al realizar la query.
// Retorna un array, donde cada row corresponde a un elemento del array.
// Cada elemento del array de un map con key el nombre de la columna y el valor
// convertido a formato Go (si encontramos []uint8 se convierte a string)
func (cli *db.SQL) FetchQuery(query string) []map[string]interface{} {
	rows, err := cli.Query(query)
	if err != nil {
		klog.Exitf("SQL query '%s' returned an error: %s", query, err)
	}

	defer rows.Close()

	// Obtenemos los nombres de las columnas, necesario tambien para saber cuantos
	// datos nos está devolviendo la consulta
	colNames, err := rows.Columns()
	if err != nil {
		klog.Exitf("obtaining column names from query '%v': %v", query, err)
	}

	// Generamos un array para almacenar los datos devueltos por cada consulta
	cols := make([]interface{}, len(colNames))
	// A Scan() tenemos que pasarle punteros, por lo que generamos otro array que
	// contendrá los punteros a las variables que almacenarán los datos
	colPtrs := make([]interface{}, len(colNames))
	for i, _ := range colNames {
		colPtrs[i] = &cols[i]
	}

	// En esta slice almacenaremos la info de todas las rows
	tableData := make([]map[string]interface{}, 0)

	for rows.Next() {
		if err := rows.Scan(colPtrs...); err != nil {
			log.Fatalf("Error obtaining rows from query '%s'. Error: %s", query, err)
		}

		// Aqui iremos agregando los nombres de las columnas con sus valores
		rowData := make(map[string]interface{})

		for i, col := range cols {
			if reflect.TypeOf(col) == reflect.TypeOf([]uint8{}) {
				// Asumimos que arrays de uint8 son strings
				rowData[colNames[i]] = string(col.([]uint8))
			} else {
				rowData[colNames[i]] = col
			}
		}

		tableData = append(tableData, rowData)
	}

	if err := rows.Err(); err != nil {
		log.Fatalf("Error during iteration of query '%s'. Error: %s", query, err)
	}

	return tableData
}

