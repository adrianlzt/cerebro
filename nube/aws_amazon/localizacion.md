Dividido en regiones, independientes entre si.
Cada región tiene varios datacenters (Availability Zones) conectados por enlaces de baja latencia.

Repartir servidores en distintas AZs nos asegura tolerancia frente a fallos en un datacenter.
Entre los AZs no nos cobran la conectividad.

Regiones:
ap-northeast-1		Asia Pacific (Tokyo) Region
ap-southeast-1		Asia Pacific (Singapore) Region
ap-southeast-2		Asia Pacific (Sydney) Region
eu-west-1		EU (Ireland) Region
sa-east-1		South America (Sao Paulo) Region
us-east-1		US East (Northern Virginia) Region
us-west-1		US West (Northern California) Region
us-west-2		US West (Oregon) Region
http://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region

Availability zones:

eu-west-1		EU (Ireland) Region
eu-west-1a
eu-west-1b
eu-west-1c


us-east-1		US East (Northern Virginia) Region
us-east-1a
us-east-1b
us-east-1c
us-east-1d



Las regiones no tienen conectividad entre si, va vía internet, y nos cobrarán ese tráfico.


Los End Points es para conectar nuestra red con la de amazon para tener ancho de banda muy alto. Hay un End Point en Madrid.
