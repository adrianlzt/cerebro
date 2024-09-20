#!/usr/bin/python

# Import troposphere
from troposphere import Template, Ref, Output, Join, GetAtt, Parameter
import troposphere.ec2 as ec2

# Create a template for resources to live in
template = Template()

# Use an already created keypair
keypair = template.add_parameter(Parameter(
    "KeyPair",
    Type="String",
    Description="Name of an existing EC2 KeyPair to enable SSH access to the instances",
    Default="asTestKey",
))

# Create a security group
sg = ec2.SecurityGroup('asTestSshHttp')
sg.GroupDescription = "testing auto scaling. allow 22 and 80"
sg.SecurityGroupIngress = [
    ec2.SecurityGroupRule(
        IpProtocol="tcp",
        FromPort="22",
        ToPort="22",
        CidrIp="0.0.0.0/0",
    ),
    ec2.SecurityGroupRule(
        IpProtocol="tcp",
        FromPort="80",
        ToPort="80",
        CidrIp="0.0.0.0/0",
    )]

# Add security group to template
template.add_resource(sg)

# Create an instance
instance = ec2.Instance("testCloudFormation")
instance.ImageId = "ami-149f7863"
instance.InstanceType = "t1.micro"
instance.SecurityGroups = [Ref(sg)]
instance.KeyName = Ref(keypair)
instance.UserData = '''
  #!/bin/bash
  yum update -y
  yum groupinstall -y 'Web Server' 'PHP Support'
  curl https://dl.dropboxusercontent.com/u/5881263/calculate_pi.php -o /var/www/html/calculate_pi.php
  service httpd start
  chkconfig httpd on
''' 

# Add instance to template
template.add_resource(instance)

# Add output to template
template.add_output(Output(
    "InstanceAccess",
    Description="Command to use to SSH to instance",
    Value=Join("", ["ssh -i ", Ref(keypair), " ubuntu@", GetAtt(instance, "PublicDnsName")])
))

# Print out CloudFormation template in JSON
print template.to_json()
