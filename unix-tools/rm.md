http://blog.liw.fi/posts/rm-is-too-slow/

shred para "triturar" un fichero

Trucos:

find target_directory -maxdepth 3 | tac | xargs -P 5 -n 5 rm -rf
  sacamos ficheros y directorios hasta maxdepth 3
  lo ordenamos a la inversa (para empezar a borrar por lo más profundo de cada dir)
  borramos de 5 en 5 (rm -fr file1 file2 file3 file4 file5) y con 5 procesos en paralelo.

  Dependiendo de la estructura de directorios pensar como poner el -P y el -n



mkdir empty
rsync -a --delete empty/ target_directory/
  mejor el truco de find



The problem with rm is going to be latency, as you note you have to read the inode data before doing anything, this happens sequentially. A kernel API that allowed multiple files to be unlinked at once wouldn't do any good unless the filesystem driver supported batch operations, using a single transaction for the meta-data changes and a single set of lookups to read the data. The latency of user to kernel space is nothing compared to disk IO.

One thing that could be done for a fast rm program would be to have a child process stat each file while the parent unlinks them. You can synchronise this by using a pipe and having the child write a byte for every file that is stat'd and the parent read a byte for every file that is unlinked, this will prevent the child from getting more than 8192 files ahead (and the kernel dentry cache should contain a lot more than that). For a RAID array (which I'm sure you are using given the size) this has the potential to provide some significant benefits. For a single disk it probably won't do much good.
