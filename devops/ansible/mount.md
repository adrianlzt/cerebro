http://docs.ansible.com/mount_module.html

# NFS
- name: add entry in fstab for icinga NFS and mount it
  mount: name=/srv/nagios src="{{ip_del_nfs}}:/mnt/icinga"
         fstype=nfs opts=defaults,rw state=mounted

state=present
  crea la entrada en /etc/fstab

state=mounted
  crea la entrada y monta el FS

