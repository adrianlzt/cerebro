sudo mkdir /root/.gnupg/
sudo touch /root/.gnupg/dirmngr_ldapservers.conf
sudo pacman-key -r 962DDE58
  Eso importa la key del repo de las fuentes
pacman-key --lsign-key 962DDE58
  Eso lo que hace es "firmar" la key para fiarte de ella



No hacer caso a las claves:
/etc/pacman.conf
SigLevel = Never
