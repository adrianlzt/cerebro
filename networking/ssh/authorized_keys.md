# from

<https://www.ssh.com/academy/ssh/authorized-keys-openssh#from=%22pattern-list%22>
<https://unix.stackexchange.com/a/490120>

Si queremos filtrar el acceso por ssh para un usuario determinado y una IP origen determinada, podemos hacer uso de una sintaxis especial del authorized_keys

```
from="192.168.1.*,192.168.2.*" ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABA...etc...mnMo7n1DD useralias
```

También se pueden usar hostnames, pero la resolución inversa debe funcionar.

Más opciones disponibles
<https://serverfault.com/a/143004>
<https://man.openbsd.org/OpenBSD-current/man8/sshd.8#AUTHORIZED_KEYS_FILE_FORMAT>

# TrustedUserCAKeys

Método de acceso donde tenemos una CA que firma certificados ssh.
Esos certificados firmados son suficiente para poder acceder por ssh a una máquina.

Usar junto con AuthorizedPrincipalsFile para mapear a que user del SO puede acceder cada cliente de vault.

Mirar como lo usa hashicorp Vault, haciendo él de firmador:
<https://developer.hashicorp.com/vault/docs/secrets/ssh/signed-ssh-certificates>

Ejemplo de como usarlo con Vault:
<https://www.hashicorp.com/blog/managing-ssh-access-at-scale-with-hashicorp-vault>

# Crear usuarios al vuelo

Usamos <https://github.com/xenago/libnss_shim> (mirar linux/nsswitch.md)

```
{
  "databases": {
    "passwd": {
      "functions": {
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
        "get_entry_by_name": {
          "command": "/bin/bash -c \"echo $name:*:19156:0:99999:7:::\""
        }
      }
    }
  }
}
```

/usr/local/bin/passwd_get_all_entries.sh

```
#!/bin/bash
echo "" >> /tmp/LOG
echo "----" >> /tmp/LOG
echo "PASSWD" >> /tmp/LOG
echo "args: $@" >> /tmp/LOG

if [ $# -eq 0 ]; then
    exit 0
fi

while getopts "u:n:" opt; do
    case $opt in
        u)
            uid=$OPTARG
            name=$(find /home -maxdepth 1 -type d -uid $uid | head -1 | cut -d "/" -f 3)
            echo "$name:x:$uid:1::/home/$name:/bin/bash"
            ;;
        n)
            name=$OPTARG
            # Miramos si ya tenemos uid para este usuario
            uid=$(stat -c %u /home/$name 2>/dev/null)
            if [[ -z $uid ]]; then
              # Si no, cogemos +1 del más alto de /home
              uid=$(stat -c %u /home/* | sort | tail -1 | awk '{print $1+1;}')
            fi
            sudo_gid=27
            echo "$name:x:$uid:$sudo_gid::/home/$name:/bin/bash" >> /tmp/LOG
            echo "$name:x:$uid:$sudo_gid::/home/$name:/bin/bash"
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done
```

Con esto consigo acceder con cualquier usuario:
➜ vault write -field=signed_key ssh-client-signer/sign/my-role public_key=@$HOME/.ssh/id_rsa.pub valid_principals=jal > /tmp/foo
➜ SSH_AUTH_SOCK="" ssh -i /tmp/foo -i ~/.ssh/id_rsa -p 2222 127.0.0.1 -l jal
jal@vagrant:~$ id
uid=1006(jal) gid=27(sudo) groups=27(sudo)

Hace falta crear el HOME al vuelo. Meter ese pam_mkhomedir tras el de session selinux y antes de cualquier otro session:
/etc/pam.d/sshd

```
session [success=ok ignore=ignore module_unknown=ignore default=bad]        pam_selinux.so close

session    required    pam_mkhomedir.so skel=/etc/skel/ umask=0022

# Set the loginuid process attribute.
session    required     pam_loginuid.so
```

Si queremos que el usuario pueda ver los mapeos (que cuando haga "id" le salgan los nombres):
chmod a+r /etc/libnss_shim/config.json
