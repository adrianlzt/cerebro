https://github.com/Yelp/python-gearman/
https://pythonhosted.org/gearman/

python
import gearman
gm_client = gearman.GearmanClient(['localhost:4730'])
gm_client.submit_job("check_results", "dHlwZT1wYXNzaXZlCmhvc3RfbmFtZT10ZXN0CnN0YXJ0X3RpbWU9MTQyMTA3OTM0NC42NjAzMjYKZmluaXNoX3RpbWU9MTQyMTA3OTM0NC42NjAzMjYKbGF0ZW5jeT0wLjAKcmV0dXJuX2NvZGU9MgpzZXJ2aWNlX2Rlc2NyaXB0aW9uPWxvYWQKb3V0cHV0PQoK")

Enviando un resultado mod_gearman encriptada en base64

