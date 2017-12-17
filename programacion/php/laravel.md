https://laravel.com/docs/5.4/artisan
Parece un poco estilo npm de nodejs
Mostrar comandos disponbles

php artisan list

# Queues / beanstalkd
https://laravel.com/docs/5.5/queues

Sacar trabajos pesados a una cola que será procesado por un worker


# Migrations
https://laravel.com/docs/5.5/migrations

Modifican la database
Los cambios ya hechos se almacenan en la tabla "migrations". Se almacena el nombre de la migración (sin el .php) y el "batch" donde se ha ejecutado.

Aplicar las migrations:
php artisan migrate
  --force, para no pedir confirmaciones (por operaciones destructivas)

Rollback:
php artisan migrate:rollback
  --step=N, especificar cuantos steps ir hacia atrás

php artisan migrate:refresh
  crear la database de 0 (hace rollback de todo y luego aplica las migrations
php artisan migrate:refresh --seed
  crear la database de 0 y poblar con los datos seed

Hace drop de las tablas y luego aplica las migrations:
php artisan migrate:fresh
php artisan migrate:fresh --seed
