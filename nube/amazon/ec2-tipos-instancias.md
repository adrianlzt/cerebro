Comparador: http://www.ec2instances.info/

# http://aws.amazon.com/es/ec2/instance-types/
# http://aws.amazon.com/es/ec2/#pricing

		API		Mem	Cores	E/S	Almacenamiento	Optimizada EBS 	Precio€/h	/dia	/mes
Microinstancia	t1.micro	613MB	1/2	Bajo	EBS		No		0.015		0.364	10.93

M1 - Primera generación
Pequeña		m1.small	1.7GB	1core	Medio	160GB		No		0.045		1.09	32.81
Mediana		m1.medium	3.75GB	2core	Medio	410GB		No		0.09		2.2	65
Grande		m1.large	7.5GB	4core	Alto	850GB		500Mbps		0.18		4.4	130
Extragrande	m1.xlarge	15GB	8core	Alto	1690GB		1000Mbps	0.36		8.8	260

M3 - Segunda generación
Extragrande	m3.xlarge	15GB	13core	Medio	EBS		No		0.38		9.12	273
2Extragrande	m3.2xlarge	30GB	26core	Alto	EBS		No		0.76		18.24	546

M2 - Gran cantidad de memoria
Extragrande	m2.xlarge	17.1GB	6.5core	Medio	420GB		No		0.31		7.47	224
2Extragrande	m2.2xlarge	34.2GB	13core	Alto	850GB		No		0.62		15	450
4Extragrande	m2.4xlarge	68.4GB	26core	Alto	1690GB		1000Mbps	1.24		30	900

C1 - Alto rendimiento
Media		c1.medium	1.7GB	5core	Medio	350GB		No		
Extragrande	c1.xlarge	7GB	20core	Alto	1690GB		No

C3 - high performance Intel Xeon E5 processors and SSD-based instance storage

CC2 - Clústeres
8Extragrande	cc2.8xlarge	60.5GB	88core	MAlto	3370GB		No

CR1 - Clústeres de memoria elevada
8Extragrande	cr1.8xlarge	244GB	88core	MAlto	240GB (SSD)	No

CG1 - GPU para clústeres
4Extragrande	cg1.4xlarge	22GB	33.5	MAlto	1690GB		No	

HI1 - E/S de alto rendimiento
4Extragrande	hi1.4xlarge	60.5GB	35core	MAlto	2x1024 (SSD)	No

HS1 - Gran capacidad de almacenamiento
8Extragrande	hs1.8xlarge	117GB	35core	MAlto	24x2TB		No

G2 - designed for applications that require 3D graphics


1 Core == Xeon 2007 1GHz


Optimización EBS:
Asegura 10% del rendimiento durante el 99.9% para las IOPS aprovisionadas

Si tiene un sitio web o una aplicación con un rendimiento relativamente bajo con la necesidad ocasional de consumir ciclos de capacidad significativa, se recomienda utilizar microinstancias.
