sudo openvpn --config fichero.ovpn

Si queremos meter auth automática.
En el fichero .ovpn:
auth-user-pass auth.txt

Y en el auth.txt:
user
password
