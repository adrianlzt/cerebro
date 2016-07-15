Actualizar keys:
sudo pacman -S archlinux-keyring


sudo mkdir /root/.gnupg/
sudo touch /root/.gnupg/dirmngr_ldapservers.conf
sudo pacman-key -r 962DDE58
  Eso importa la key del repo de las fuentes
pacman-key --lsign-key 962DDE58
  Eso lo que hace es "firmar" la key para fiarte de ella



No hacer caso a las claves:
/etc/pacman.conf
SigLevel = Never


# Errores
error: XXXX: signature from "NOMBRE <EMAIL@EMAIL.com>" is unknown trust

Arreglar con:
sudo pacman-key --refresh-keys


# Opciones cuando falla
• import the key and sign it locally
gpg --recv-keys 5A92E04305696D78
gpg --lsign-key 5A92E04305696D78

• add the key to the 'validpgpkeys' array in the PKGBUILD
validpgpkeys=('2E708FB2FCECA07FF8184E275A92E04305696D78')

• use makepkg --skippgpcheck

