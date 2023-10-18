https://docs.timescale.com/use-timescale/latest/compression/

Al añadir rows se meten sin compresión.
Tiene un job que va realizando la compresión.

La compresión funciona metiendo varios rows en uno solo, usando un arrray.
Parece que los índices que puedan venir en la tabla se dejan de usar, en favor de unos custom de timescale.

Configuraciones de compresión:
select * from timescaledb_information.compression_settings;


# Jobs
select * from timescaledb_information.jobs;

Ejecutarlo en la db donde queramos ver los jobs.
