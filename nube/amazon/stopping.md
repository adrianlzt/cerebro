# http:// docs.aws.amazon.com/AWSEC2/latest/UserGuide/Stop_Start.html

Si marcamos una instancia como Stop:
	Termina la ejecución
	Los EBS se mantienen unidos (y gastando dinero)
	Los store volumes no persisten
	Se pierde la ip privada y publica
	Mantiene la union a Elastic IP
	El balanceador mantiene la unión, pero posiblemente no funcionara tras el reinicio. Unirla de nuevo
