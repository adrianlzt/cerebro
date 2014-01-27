Se manejan con el keytool:
Ubuntu trae una herramienta para ver e importar los certificados (gcr-viewer). Se abren desde el escritorio.
Herramienta gráfica: http://sourceforge.net/projects/portecle/

Importar certificado pfx:
	keytool -importkeystore -srckeystore pez.pfx -srcstoretype pkcs12
	Me pedirá una contraseña para mi almacén de claves, y la del pfx

Importar certificado de autoridad de confianza
	keytool -importcert -file The-Certificate-Authority-SRV-cert.cer -alias icaCA

Importar certificado de un servidor
	keytool -importcert -file The-ASA-SRV-WebVPN-cert.cer -alias WebVPN

Mostrar certificados:
	keytool -list

Borrar certificado:
	keytool -delete -alias <alias>
