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
client.Configuration().api_key={"authorization":"Bearer XXX"}
api = client.OapiApi()
api.list_project()

Obtener los projectos 
kubernetes_namespace = openshift.list_project().items[0].metadata.name

Ejemplo kubernetes:
from kubernetes import client, config
client.Configuration().host="https://openshift.inet"
client.Configuration().verify_ssl=False
client.Configuration().api_key={"authorization":"Bearer XXX"}
v1 = client.CoreV1Api()
v1.list_namespaced_pod("alt390")


Watch eventos:
from kubernetes import client, config, watch
client.Configuration().host="https://openshift.inet"
client.Configuration().verify_ssl=False
client.Configuration().api_key={"authorization":"Bearer XXX"}
v1 = client.CoreV1Api()
w = watch.Watch()
for event in w.stream(v1.list_namespace, _request_timeout=60):
    print("Event: %s %s" % (event['type'], event['object'].metadata.name))

Escuchar eventos de pods del namespace alt390:
for event in w.stream(v1.list_namespaced_pod, namespace="alt390", _request_timeout=60):
    print("Event: %s %s" % (event['type'], event['object'].metadata.name))

Escuchar eventos de un namespace a partir de un determinado momento:
for event in w.stream(v1.list_namespaced_event, namespace="alt390", _request_timeout=60, resource_version=37390660):
    print("Event: %s %s" % (event['type'], event['object'].metadata.name))

type puede ser: ADDED, MODIFIED, DELETED, or ERROR https://github.com/kubernetes/kubernetes/blob/v1.9.0-alpha.2/pkg/watch/json/types.go#L35

resource_version se puede sacar de event.get("object").metadata.resource_version

watch es un objeto generico que escucha lo que le pasemos.
list_namespaced_pod se define en kubernetes/client/apis/core_v1_api.py (fichero gigante, cuidado)
Tiene varios parametros.

Problemas escuchando eventos? Se termina abruptamente el watch?
https://github.com/kubernetes-client/python-base/pull/36
https://github.com/kubernetes-incubator/client-python/issues/124


Obtener confimaps de un namespace filtrando por un label:
kube.list_namespaced_config_map(label_selector="app=cycops-agent-openshift", namespace="nombre")

Patch de un ConfigMap:
kube.patch_namespaced_config_map("cyclops-agent-config-map","alt390", {"data":{"python":"cmd=/usr/lib64/nagios/plugins/check_dummy 2 CRITICAL"}})


## Debug
kube.api_client.config.debug = True


# Cliente kube
https://bitbucket.org/cobeio/kube/
Para python3


# Watching events con python
https://cobe.io/blog/posts/kubernetes-watch-python/
