https://ci.apache.org/projects/libcloud/docs/

Apache Libcloud is a Python library which hides differences between different cloud provider APIs and allows you to manage different cloud resources through a unified and easy to use API.

Resource you can manage with Libcloud are divided in the following categories:

Cloud Servers and Block Storage - services such as Amazon EC2 and RackSpace CloudServers
Cloud Object Storage and CDN - services such as Amazon S3 and Rackspace CloudFiles
Load Balancers as a Service - services such as Amazon Elastic Load Balancer and GoGrid LoadBalancers
DNS as a Service - services such as Amazon Route 53 and Zerigo


Es python.

Ejemplo conectando a Rackspace y obteniendo la lista de flavors e imágenes:

from pprint import pprint

from libcloud.compute.types import Provider
from libcloud.compute.providers import get_driver

cls = get_driver(Provider.RACKSPACE)
driver = cls('my username', 'my api key')

pprint(driver.list_sizes())
pprint(driver.list_nodes())
