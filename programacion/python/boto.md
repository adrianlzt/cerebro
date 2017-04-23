https://github.com/boto/boto3
The AWS SDK for Python



# S3

## Cliente con endpoint particular
client = boto3.client("s3", endpoint_url="http://store-2:7480", aws_access_key_id="QO2K1W2H5KBXQNU378EA", aws_secret_access_key="WmylYB50xNPIOeMVhBoVfc0a5fRjxOp7Qpn6MdXW")


## Listar buckets
import boto3
s3 = boto3.resource("s3")




