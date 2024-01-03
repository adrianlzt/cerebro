https://unix.stackexchange.com/a/490120

Si queremos filtrar el acceso por ssh para un usuario determinado y una IP origen determinada, podemos hacer uso de una sintaxis especial del authorized_keys

from="192.168.1.*,192.168.2.*" ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABA...etc...mnMo7n1DD useralias


Más opciones disponibles
https://serverfault.com/a/143004
https://man.openbsd.org/OpenBSD-current/man8/sshd.8#AUTHORIZED_KEYS_FILE_FORMAT


# TrustedUserCAKeys
Método de acceso donde tenemos una CA que firma certificados ssh.
Esos certificados firmados son suficiente para poder acceder por ssh a una máquina.

Usar junto con AuthorizedPrincipalsFile para mapear a que user del SO puede acceder cada cliente de vault.

Mirar como lo usa hashicorp Vault, haciendo él de firmador:
https://developer.hashicorp.com/vault/docs/secrets/ssh/signed-ssh-certificates

Ejemplo de como usarlo con Vault:
https://www.hashicorp.com/blog/managing-ssh-access-at-scale-with-hashicorp-vault

# Crear usuarios al vuelo
Usamos https://github.com/xenago/libnss_shim (mirar linux/nsswitch.md)

{
  "databases": {
    "group": {
      "functions": {
        "get_all_entries": {
          "command": "/bin/bash -c ':'"
        },
        "get_entry_by_gid": {
          "command": "/bin/bash -c ':'"
        },
        "get_entry_by_name": {
          "command": "/bin/bash -c ':'"
        }
      }
    },
    "passwd": {
      "functions": {
        "get_all_entries": {
          "command": "/usr/local/bin/passwd_get_all_entries.sh"
        },
        "get_entry_by_uid": {
          "command": "/usr/local/bin/passwd_get_all_entries.sh -u <$uid>"
        },
        "get_entry_by_name": {
          "command": "/usr/local/bin/passwd_get_all_entries.sh -n <$name>"
        }
      }
    },
    "shadow": {
      "functions": {
        "get_all_entries": {
          "command": "/usr/local/bin/shadow_get_all_entries.sh"
        },
        "get_entry_by_name": {
          "command": "/usr/local/bin/shadow_get_all_entries.sh -n <$name>"
        }
      }
    }
  }
}


/usr/local/bin/shadow_get_all_entries.sh
```
#! /bin/sh
echo "" >> /tmp/LOG
echo "SHADOW" >> /tmp/LOG
echo "$@" >> /tmp/LOG

if [ $# -eq 0 ]; then
    exit 0
fi

while getopts "u:n:" opt; do
    case $opt in
        n)
            name=$OPTARG
            echo "$name:\$6\$vagrant.\$sd6r0/OKL.FIGZbhanVkrLassSxoPRv1h5lkISsmBONqaLUGVXkEcD22Ddak5W8JSxeU0VFkU/We1Y7o4hVO/1:19156:0:99999:7:::"
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done
```


/usr/local/bin/passwd_get_all_entries.sh
```
#! /bin/sh
echo "" >> /tmp/LOG
echo "PASSWD" >> /tmp/LOG
echo "$@" >> /tmp/LOG

if [ $# -eq 0 ]; then
    exit 0
fi

while getopts "u:n:" opt; do
    case $opt in
        u)
            uid=$OPTARG
            echo "pepe:x:$uid:1::/home/pepe:/bin/bash"
            ;;
        n)
            name=$OPTARG
            echo "$name:x:10222:1::/home/$name:/bin/bash"
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done
```

Con esto consigo acceder con cualquier usuario:
➜ vault write -field=signed_key ssh-client-signer/sign/my-role public_key=@$HOME/.ssh/id_rsa.pub valid_principals=juana > /tmp/foo
➜ SSH_AUTH_SOCK="" ssh -i /tmp/foo -i ~/.ssh/id_rsa -p 2222 -l juana 127.0.0.1
$ id
uid=10222 gid=1(daemon) groups=1(daemon)


Si queremos crear el HOME al vuelo, meter ese pam_mkhomedir tras el de session selinux y antes de cualquier otro session:
/etc/pam.d/sshd
session [success=ok ignore=ignore module_unknown=ignore default=bad]        pam_selinux.so close

session    required    pam_mkhomedir.so skel=/etc/skel/ umask=0022

# Set the loginuid process attribute.
session    required     pam_loginuid.so
