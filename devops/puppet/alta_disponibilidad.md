Balanceador -- 2 x nginx -- 2x(puppet+foreman)
Para tener las configuraciones de los master, cuando se hace un commit a git, hay un hook que por rsync los copia a los master.
