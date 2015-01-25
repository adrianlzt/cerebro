Como lo hace MAAS.
Servidor tgtd
Conf:

# cat /etc/tgt/targets.conf 
include /etc/tgt/conf.d/*.conf


# cat /etc/tgt/conf.d/maas.conf 
<target iqn.2004-05.com.ubuntu:maas:ephemeral-amd64-generic-precise-release>
    readonly 1
    allow-in-use yes
    backing-store "/var/lib/maas/boot-resources/snapshot-20150118-123937/amd64/generic/precise/release/root-image"
    driver iscsi
</target>
<target iqn.2004-05.com.ubuntu:maas:ephemeral-amd64-generic-trusty-release>
    readonly 1
    allow-in-use yes
    backing-store "/var/lib/maas/boot-resources/snapshot-20150118-123937/amd64/generic/trusty/release/root-image"
    driver iscsi
</target>


# file /var/lib/maas/boot-resources/snapshot-20150118-123937/amd64/generic/trusty/release/root-image
/var/lib/maas/boot-resources/snapshot-20150118-123937/amd64/generic/trusty/release/root-image: Linux rev 1.0 ext4 filesystem data, UUID=ce62663c-1fb4-4b14-bce5-39a359af779d, volume name "cloudimg-rootfs" (extents) (large files) (huge files)
