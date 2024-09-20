http://aws.amazon.com/es/route53/

Amazon Route 53 es un servicio web DNS (Sistema de nombres de dominio) escalable y de alta disponibilidad. Está diseñado para ofrecer a los desarrolladores y las empresas una forma altamente fiable y rentable de direccionar los usuarios finales a las aplicaciones en Internet convirtiendo nombres legibles para las personas como www.example.com en direcciones IP numéricas como 192.0.2.1 que utilizan los sistemas para conectarse entre ellos. Route 53 conecta de manera eficaz las solicitudes de usuario con las infraestructuras que se ejecutan en Amazon Web Services (AWS) (como, por ejemplo, una instancia de Amazon Elastic Compute Cloud (Amazon EC2), un Amazon Elastic Load Balancer, una distribución de CloudFront o un depósito de Amazon Simple Storage Service (Amazon S3)) y también puede utilizarse para direccionar los usuarios a infraestructuras situadas fuera de AWS.

Tenemos que comprar un dominio en algun 'registrar' (nombre inglés del registrador de DNS).

Vamos a la consola de Route53 y pinchamos en "Created Hosted Zone", allí nos pedirá el nombre del dominio que estamos creando.
Al finalizar nos dará cuatro name servers que se encargarán de este dominio.

Volveremos al 'registrar', y le diremos que nuestros NS son esos que nos ha dado amazon.

Ahora ya podremos crear dominios asociados al dominio que hemos cedido a Route53.

Tendremos 4 opciones para devolver las IPs de un subdominio.
  Simple
    Devulve todas las entradas que le digamos, pero cambiando el orden
  Weighted
    Se devuelve en base a la probabilidad del peso respecto a la suma de pesos (1,1,3, los nodos con peso 1 tienen 1/5 de probabilidad de salir)
  Latency
    Asociamos unas IPs a unas zonas determinadas. Si el cliente está en EU, devolverá las asociadas a la zona de irlanda. Si está en australia la de allí, etc
  Failover
    Se asocia a un helth check. Si está correcto, se devuelve la ip Primary, si está mal, se devuelve la ip Secundary.
