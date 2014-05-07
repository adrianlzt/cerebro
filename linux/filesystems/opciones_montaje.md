noatime     			# no actualiza fecha de acceso. Incremento grande de ganancia
				# algún programa antiguo podría fallar si no actualizamos este dato (programas antiguos de correo por ejemplo)
relatime    			# actualiza fecha de acceso solo si es antigua
chattr +A   			# noatime para ficheros concretos
commit=100  			# sync automatico (por defecto cada 5 segundos)
tune2fs -O dir_index <DIR>  	# acelera lista directorios enormes
mke2fs -b 4096  		# incrementar blocksize para ficheros grandes

