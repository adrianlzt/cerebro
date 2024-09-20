Steps:
 - key pair
 - security group
 - instance


Generate keypair
aws ec2 create-key-pair --key-name asTestKey
echo -e "-----BEGIN RS..." > asTestKey.pem
chmod 0400 asTestKey.pem


Generate security group
aws ec2 create-security-group --group-name asTestGroup --description "Security group. Testing auto scaling"
GroupId: sg-96b4f5e1y

Open ports 22 and 80 in the previous generated security group
aws ec2 authorize-security-group-ingress --group-name asTestGroup --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name asTestGroup --protocol tcp --port 80 --cidr 0.0.0.0/0


Start instance ami-149f7863 Amazon Linux AMI (64-bit)
aws ec2 run-instances --image-id ami-149f7863 --key-name asTestKey --security-groups asTestGroup --instance-type t1.micro
InstanceId: i-f48e02bb

It is hard to pass user-data from command line.


Obtain public ip:
aws ec2 describe-instances --instance-ids i-f48e02bb | grep PublicIp
PublicIpAddress: 54.217.176.130


ssh -i asTestKey.pem ec2-user@54.217.176.130

