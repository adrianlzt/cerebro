Tres opciones:

-Manual:
	Definiendo dirección ip, máscara, puerta de enlace y servidores dns

-DHCPv6: 
	un servidor donde configuremos los parámetros anteriores
	¿Qué dirección utiliza el dhclient para encontrar al dhcpd?

-IPv6:
	Mediante mensajes
		RA - Router Advertisement
		RS - Router Solicitation
		SLAAC: Stateless Address Auto Configurator
	No se cofigura el DNS (en windows, LLMNR intentará buscar server dns en fec0:0:0:ffff::{1,2,3})

	El router cuando se conecta a la red envía un mensaje RS, ante el que los routers disponibles envian respuestas para que el SLAAC del cliente se pueda autoconfigurar.
	Si el equipo elige como primer salto el router incorrecto, este le enviará un mensaje NDP del tipo Redirect indicándole cual es la mejor ruta.

