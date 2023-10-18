https://docs.timescale.com/use-timescale/latest/compression/

Al añadir rows se meten sin compresión.
Tiene un job que va realizando la compresión.

La compresión funciona metiendo varios rows en uno solo, usando un arrray.
Parece que los índices que puedan venir en la tabla se dejan de usar, en favor de unos custom de timescale.
