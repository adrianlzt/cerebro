https://github.com/Go-SQL-Driver/MySQL/
https://github.com/go-sql-driver/mysql/wiki/Examples
http://go-database-sql.org

mysql_example.go

Tests, libreria para mockear un driver sql: https://github.com/DATA-DOG/go-sqlmock


Escanear un unico row
row := sql.QueryRow(query)
err := row.Scan(&hostID, &host, &itemCount)
if err != nil {
  return fmt.Errorf("query get host info: %v", err)
}


Pasar un parametro a una query:
El placeholder para postgresql es "$1" (parece que puede variar entre databases)
QueryRow("select * from ?", "tabla")




Gestionando NULLs
https://github.com/golang/go/wiki/SQLInterface#dealing-with-null
var name NullString
err := db.QueryRowContext(ctx, "SELECT name FROM names WHERE id = $1", id).Scan(&name)
...
if name.Valid {
  // use name.String
} else {
  // value is NULL
}

Only NullBool, NullFloat64, NullInt64 and NullString are implemented in database/sql. Implementations of database-specific null types are left to the database driver.




https://github.com/jmoiron/sqlx
Simplifica el acceso a sql.
Por ejemplo, nos permite pasarle un struct, o array de struct, a una query SELECT y nos rellena el struct/array


# Postgresql
Postgresql ejemplo: https://www.calhoun.io/connecting-to-a-postgresql-database-with-gos-database-sql-package/
El driver github.com/lib/pq no devuelve los ColumnTypes
_ "github.com/lib/pq"



sqlite: https://raw.githubusercontent.com/mattn/go-sqlite3/master/_example/simple/simple.go


http://go-database-sql.org/varcols.html
Si no sabemos el número de columnas que nos devuelve SELECT
https://stackoverflow.com/questions/29102725/go-sql-driver-get-interface-column-values

Los drivers generalmente soportarán el devolvernos el tipo de dato que estamos escaneando:
https://golang.org/pkg/database/sql/#ColumnType
Obtenemos el array de tipos de datos con: rows.ColumnTypes()

Podemos usar esta información para crear una slice de punteros que pasar a Scan().

La implementación para generar el array de punteros.
Posiblemente haya una forma mejor de generar el puntero a almacenar sin tener que hacer esos if-elseif
Seguramente también falten algunos tipos de datos
  ct, err := rows.ColumnTypes()
  if err != nil {
    log.Fatalf("obtaining column types")
  }

  colPtrs := make([]interface{}, len(colNames))
  for i, c := range ct {
    b := c.ScanType()

    var num int64
    var driverDec driver.Decimal
    var str string
    var time time.Time
    var iface interface{}

    // bool lo lee como uint8, por lo que usaremos int64

    typeOfNum := reflect.TypeOf(num)
    typeOfDriverDec := reflect.TypeOf(driverDec)
    typeString := reflect.TypeOf(str)
    typeTime := reflect.TypeOf(time)

    if b.ConvertibleTo(typeOfNum) {
      colPtrs[i] = &num
    } else if b.ConvertibleTo(typeOfDriverDec) {
      colPtrs[i] = &driverDec
    } else if b.ConvertibleTo(typeString) {
      colPtrs[i] = &str
    } else if b.ConvertibleTo(typeTime) {
      colPtrs[i] = &time
    } else {
      colPtrs[i] = &iface
    }
  }


Una vez retornemos la información, tendremos que usar un switch-type para ver que dato se nos ha devuelto.
Igualmente, aqui seguramente falten tipos de datos. "col" es el puntero almacenado en colPtrs que hemos pasado a Scan()
driver.Decimal, en el caso de SAP HANA, es un big.Rat
  switch v := col.(type) {
  case *string:
    pp := *v
    fields[colName] = pp
  case *driver.Decimal:
    f64, _ := (*big.Rat)(v).Float64()
    fields[colName] = f64
  case *int64:
    pp := *v
    fields[colName] = pp
  case *time.Time:
    pp := *v
    fields[colName] = pp
  default:
    log.Printf("hana: unknown data type to convert field: %T\n", v)
  }



Otra forma es generar una lista de punteros apuntando a interface{}
https://stackoverflow.com/a/33363314
Ejemplo de función que acepta un "select *" y pinta el resultado.
Luego se hace un cast para comprobar que tipo de dato es.

Para SAP HANA he encontrado que los float los devuelve como []uint8 al pasarle un interface{} como destino del almacenamiento.
Podemos hacer uso del método Scan() de driver.Decimal para comprobar si ese []uint8 es un Decimal:
// Los float, si pasamos a Scan() un interface{} se implementan como []uint8
// Usamos el método Scan de driver.Decimal para comprobar si este []uint8 es un driver.Decimal
func convertToFloat(v []uint8) (float64, error) {
  x := &driver.Decimal{}
  err := x.Scan(v)
  if err != nil {
    return 0, fmt.Errorf("[]uint8 is not type driver.Decimal")
  }

  bigRat := (big.Rat)(*x)  // Por debajo los Decimal son big.Rat. Cast para poder usar los metodos de Rat
  f, _ := bigRat.Float64()  // Convertimos a float, ignoramos saber si el resultado es exacto
  return f, nil
}






El ejemplo siguiente creo que no está muy bien al final, mejor hacer como el ejemplo de stackoverflow

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

