Bases de datos gestionadas por GCP.

Postgres
MySQL
...

Las instancias tardan varios minutos en crearse (6', 11' he visto)

Para conectar podemos usar:
  - ips privadas (mirar gcp_vpc.md)
  - ip pública (usando una lista de redes permitidas)
  - cloud sql proxy


Si usamos una IP privada, una vez creada la instancia, podremos obtener su ip para poder conectar.


Si queremos configurar el tipo de VM podemos usar la sintaxis
db-custom-N-M
Siendo N el número de CPUs y M la memoria.
https://cloud.google.com/sql/docs/postgres/create-instance

Modificar la config de la instancia hace un update (no recrea).
También puede llevar bastante tiempo (visto 10').
Mientras actualizaba pude estar unos minutos conectado con psql, pero en un punto, me hecho y tuve que reconectar.


# Ejemplo postgres 13

resource "google_sql_database_instance" "prod_postgres" {
  name             = "postgres-prod"
  database_version = "POSTGRES_13"

  settings {
    tier      = "db-custom-2-7680"
    disk_size = 20

    # high availability
    availability_type = "REGIONAL"

    backup_configuration {
        enabled = true
        start_time = "03:00"  # UTC
        backup_retention_settings {
            # Have at least two weeks to discover a problem and recover from the backup
            retained_backups = 15
        }

        # Poder recuperar el estado de cualquier punto de los últimos 7 días
        point_in_time_recovery_enabled = true
        transaction_log_retention_days = 7
    }

    maintenance_window {
        day = 7 # sunday
        hour = 5  # UTC
    }

    # más info sobre las queries, tiempos, etc
    insights_config {
        query_insights_enabled = true
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.FOO.id
    }
  }
}

variable "postgres_prod_password" {
  description = "Password for the postgres user in the Postgres instance for the prod environment"
  type        = string
  sensitive   = true
}

resource "google_sql_user" "prod_postgres_admin" {
  name     = "postgres"
  instance = google_sql_database_instance.prod_postgres.name
  password = var.postgres_prod_password
}
