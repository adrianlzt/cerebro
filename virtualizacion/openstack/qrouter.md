En los controller de OpenStack tenemos un qrouter por cada red virtual creada.
Para ver los qrouters (crean un namespace cada uno):
ip netns

Los namespaces se llamaran qrouter-ID (el id será el id dado por openstack al router)
