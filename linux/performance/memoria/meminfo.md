http://www.redhat.com/advice/tips/meminfo.html

- Información detallada de memoria del sistema (usada por free y vmstat)

mostrar en GB
cat /proc/meminfo | awk  '{x=$2;x=x/1024/1024;$2=x;$3="GB"}1'


http://stackoverflow.com/questions/658411/entries-in-proc-meminfo
MemTotal = MemFree + Active + Inactive + Slab + PageTables + VmallocUsed + X (X : alloc_pages() (get_free_pages(), etc))
MemUsed = Active + Inactive + Slab + PageTables + VmallocUsed + X (X : alloc_pages() (get_free_pages(), etc))
Active + Inactive = Buffers + Cached + SwapCached + AnonPages
Total PageCache = Buffers + Cached + SwapCached
Slab = SReclaimable + SUnreclaim

cat /proc/meminfo 
  %MemTotal     # RAM total usable (menos reservada por kernel)
  %MemFree      # memoria libre (incluyendo buffers y pagecache)
  %Buffers      # Relatively temporary storage for raw disk blocks (http://elixir.free-electrons.com/linux/latest/source/mm/page_alloc.c#L4363)
  %Cached       # pagecache en RAM (contenido de ficheros cacheados)
  %SwapCached   # pagecache en swap que también está en RAM (por tanto
                # si se necesita memoria puede descartarse sin swapear)
  %Active         # recientemente usada: %Active(anon) + %Active(file)
  %Inactive       # no recientemente usada: %Inact(anon) + %Inact(file)
  %Active(anon)   # páginas anónimas (normalmente no se reclaman)
  %Inactive(anon) # páginas anónimas, menos reclamables que Inact(file)
  %Active(file)   # páginas de ficheros (normalmente no se reclaman)
  %Inactive(file) # páginas de ficheros (muy reclamables)
  %Unevictable    # páginas que no pueden sacarse de RAM (p.e. ramdisk o
                  # por falta de swap)
  %Mlocked        # páginas que no pueden sacarse de RAM por mlock()
  %SwapTotal    # swap total activa
  %SwapFree     # swap no usada
  %Dirty        # paginas modificadas en RAM (deben llevarse a disco)
  %Writeback    # paginas "dirty" que están llevandose a disco
  %AnonPages    # paginas anonimas (no file-backed) mapeadas
  %Mapped       # ficheros mapeados en memoria con mmap()
  %Shmem        # memoria compartida (fundamentalmente IPC)
  %Slab         # slab cache de objetos del kernel (=SReclaimable+SUnreclaim)
  %SReclaimable # slab reclamable (p.e. caches de inodes y dentries)
  %SUnreclaim   # slab no reclamable
  %KernelStack  # stack en modo supervisor, usada por el kernel
  %PageTables:  # usado para entries de pagetables (menor con HugePages), tamaño de la tabla TLB
  %NFS_Unstable # paginas enviadas a server NFS pero no comiteadas
  %Bounce       # memory used for block device "bounce buffers"
  %WritebackTmp # usada como buffer writeback por FUSE
  %CommitLimit  # memoria total disponible (overcommit_ratio*RAM+swap, solo se aplica con overcommit_ratio=2)
                # es como el overbooking, se da más memoria de la que realmente existe porque se sabe que después los procesos no usarán toda la pedida
  %Committed_AS # The amount of memory presently allocated on the system.  The committed memory is a sum of all of the memory which has been allocated by processes, 
                # even if it has not been "used" by them as of yet
  %VMallocTotal  # total allocated virtual address space.
  %VMallocUsed   # total amount of used virtual address space.
  %VMallocChunk  # largest contiguous block of memory of available virtual address space.
  %HugePages_Total # num total de Hugepages
  %HugePages_Free  # Hugepages libres
  %HugePages_Rsvd  # Hugepages "reserved" (comprometidas, no allocated,
                   # parecido a overcommit)
  %HugePages_Surp  # Hugepages "surplus" (exceso sobre %HugePages_Total)
  %Hugepagesize    # tamaño de Hugepage (512 páginas, 2M)

