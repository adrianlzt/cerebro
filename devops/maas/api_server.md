Paquete: python-django-maas

Es un servidor django:
/usr/lib/python2.7/dist-packages/metadataserver

Parece que casi todo se hace en:
/usr/lib/python2.7/dist-packages/maasserver


De donde saca la IPs que da para la conf pxe:

urls_api.py
    from maasserver.api import pxeconfig
    url(r'pxeconfig/$', pxeconfig, name='pxeconfig'),

api.py
    def pxeconfig(request)

    preseed_url = compose_enlistment_preseed_url(nodegroup=nodegroup)
    ...
    server_address = get_maas_facing_server_address(nodegroup=nodegroup)
        def get_maas_facing_server_host(nodegroup=None):
            if nodegroup is None or not nodegroup.maas_url:
                maas_url = settings.DEFAULT_MAAS_URL --> /etc/maas/maas_local_settings.py
            else:
                maas_url = nodegroup.maas_url
                             NodeGroup.objects.get(uuid=uuid) # el uuid es el cluster_uuid de la peticion
                                                              # Este valor lo saca de la tabla: maasserver_nodegroup de la postgresql

    cluster_address = get_mandatory_param(request.GET, "local")

    params = KernelParameters(
        arch=arch, subarch=subarch, release=series, label=label,
        purpose=purpose, hostname=hostname, domain=domain,
        preseed_url=preseed_url, log_host=server_address,
        fs_host=cluster_address, extra_opts=extra_kernel_opts)

