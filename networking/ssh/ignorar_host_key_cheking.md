ssh -o StrictHostKeyChecking=no yourHardenedHost.com


O en el fichero:
Host *
    StrictHostKeyChecking no


Para no hacer caso a cambios de key:
UserKnownHostsFile=/dev/null
