# Cliente oficial
https://github.com/openshift/openshift-restclient-python
Doc API: https://github.com/openshift/openshift-restclient-python/blob/master/openshift/README.md
https://github.com/kubernetes-incubator/client-python/blob/master/kubernetes/README.md

Python client for the OpenShift API
Recubrimiento del modulo para kubernetes.
Para trabajar con elementos de kubernetes, usar el modulo de python de kubernetes
Para temas de openshift, el de openshift.

Examples: https://www.linux.com/learn/kubernetes/enjoy-kubernetes-python

pip install openshift


Ejemplo openshift:
from openshift import client, config
client.Configuration().host="https://openshift.inet"
client.Configuration().verify_ssl=False
client.Configuration().api_key={"authorization":"Bearer zASf6wxdkUBTpdfeXkMGKtAHbAs8fu5GIwTCWIDj5lY"}
api = client.OapiApi()
api.list_project()

Ejemplo kubernetes:
from kubernetes import client, config
client.Configuration().host="https://openshift.inet"
client.Configuration().verify_ssl=False
client.Configuration().api_key={"authorization":"Bearer zASf6wxdkUBTpdfeXkMGKtAHbAs8fu5GIwTCWIDj5lY"}
v1 = client.CoreV1Api()
v1.list_namespaced_pod("alt390")


Problemas escuchando eventos?
https://github.com/kubernetes-client/python-base/pull/36
https://github.com/kubernetes-incubator/client-python/issues/124



# Cliente kube
https://bitbucket.org/cobeio/kube/
Para python3
