# Usando IOCTL
https://github.com/torvalds/linux/blob/5bfc75d92efd494db37f5c4c173d3639d4772966/include/uapi/linux/sockios.h#L51
/* Routing table calls. */
#define SIOCADDRT	0x890B		/* add routing table entry	*/
#define SIOCDELRT	0x890C		/* delete routing table entry	*/
#define SIOCRTMSG	0x890D		/* unused			*/


usando ioctl para añadir una ruta
ttps://stackoverflow.com/questions/57959731/add-route-programmatically-in-c-using-ioctl

visto con sysdig al llamar a "route add"
socket domain=2(AF_INET) type=2 proto=0
ioctl fd=3(<4>) request=890B argument=7FFE973FCE40
  el argument es un puntero al struct con los datos de ip, mask, gw, iface, etc


# Usando netlink
mirar ../netlink.md
