https://pypi.python.org/pypi/awscli
http://docs.aws.amazon.com/cli/latest/reference/
pip install awscli

Para tener el autocompeltado:
echo -e "# aws cli (pip python)\ncomplete -C aws_completer aws" >> ~/.bash_completion

AYUDA:
aws SERVICIO help
aws SERVICIO COMANDO help

Configuración:
aws configure
  Genera el fichero .aws/config y nos pedirá las claves, la región por defecto y el tipo de formateo (table, json o text)

Output:
aws --output table|json|text servicio comando


Estado de las instancias:
aws ec2 describe-instance-status

Más información:
aws ec2 describe-instances
De una en particular:
aws ec2 describe-instances --instance-ids i-0e9df042


Terminar instancia:
aws ec2 terminate-instances --instance-ids i-0e9df042

Apagar una instancia
aws ec2 stop-instances --instance-ids i-0e9df042

Crear una imagen de una instancia parada (tambien vale de una running?)
aws ec2 create-image --instance-id i-62f4eb2e --name calculopi


## Keypairs ##
#Generate keypair
aws ec2 create-key-pair --key-name asTestKey
echo -e "-----BEGIN RS..." > asTestKey.pem
chmod 0400 asTestKey.pem

#Import
aws ec2 import-key-pair --key-name (no lo he probado, algo asi)


## Security groups ##
authorize-security-group-ingress
authorize-security-group-egress
revoke-security-group-egress
revoke-security-group-ingress
