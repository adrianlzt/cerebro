Ejemplo extrayendo datos de una Postgres:
input {
  jdbc {
    jdbc_connection_string => "jdbc:postgresql://db_server:5432/"
    jdbc_driver_class => "org.postgresql.Driver"
    jdbc_driver_library => "/home/elastic/postgresql-9.1-901-1.jdbc4.jar"
    jdbc_user => "postgres"
    jdbc_password => "password"
    statement => "SELECT * from blogs"
  }
}
