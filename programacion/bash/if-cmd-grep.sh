DESCONECTADO="$(/opt/cisco/anyconnect/bin/vpn stats | grep 'The VPN client state is not')"
if [ -z "$DESCONECTADO" ]; then
	notify-send -t 500 "Ya conectado VPN"
	exit
else
	~/Documentos/vpn-dsn/vpn.sh
fi

DESCONECTADOre="$(/opt/cisco/anyconnect/bin/vpn stats | grep 'The VPN client state is not')"
if [ -z "$DESCONECTADOre" ]; then
	notify-send -i /usr/share/icons/gnome/48x48/actions/call-start.png -t 2000 "Conectado VPN"
else
        notify-send -i /usr/share/icons/hicolor/48x48/emblems/emblem-ubuntuone-unsynchronized.png -t 2000 "Error conectando VPN"
fi

