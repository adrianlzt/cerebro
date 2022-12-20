http://docs.ansible.com/fetch_module.html

Para obtener ficheros del remoto.


- name: copy to our computer the mongo backup
  fetch: src=/tmp/cyclops-backup.bson.tgz dest=backup/ fail_on_missing=yes flat=yes

Falla si /tmp/cyclops-backup.bson.tgz no existe
Lo copia en nuestro pc en backup/cyclops-backup.bson.tgz

Si no ponemos flat lo copiaria en:
backup/nombrehost/tmp/cyclops-backup.bson.tgz



# Ad-hoc
ansible group_A_nfs_ci_1 -m fetch -a "src=/home/cloud-user/nfs.cap dest=/tmp/nfs.cap"

/tmp/nfs.cap/172.16.1.208/home/cloud-user/nfs.cap
