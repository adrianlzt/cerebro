Definimos las gemas que hacen falta para nuestro proyecto.

Podemos definir gemas distintas para distintos entornos:

gem 'pg', group: :production
gem 'sqlite3', group: [:development, :test]
