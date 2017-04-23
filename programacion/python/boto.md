https://github.com/boto/boto3
The AWS SDK for Python



# S3

## Cliente con endpoint particular
s3 = boto3.resource(service_name='s3', endpoint_url='http://localhost:7480', aws_access_key_id="Q2K125BQEA", aws_secret_access_key="WylB0xPOeVhoVca5RjxO7Qp6MdXW")

## Listar buckets
import boto3
s3 = boto3.resource("s3")
for i in s3.buckets.all():
  print(i)


## Listar contenido de un bucket
bucket = s3.Bucket("my-new-bucket")
for i in bucket.objects.all():
  print(i)


## Coger un objecto
bucket.Object("pruebapy")


## ACLs
Tener read en un bucket nos permite poder hacer un list sobre el bucket, pero no significa que podamos leer el contenido de todos los objects.

acl = bucket.Acl()
acl.grants

Public read para un bucket
bucket.Acl().put(ACL='public-read')

Public read para un objecto
b.Acl().put(ACL="public-read")

Public-read mete este "Grantee"
{u'Grantee': {u'Type': 'Group', u'URI': 'http://acs.amazonaws.com/groups/global/AllUsers'}, u'Permission': 'READ'}
