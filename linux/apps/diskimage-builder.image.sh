export DIB_BLOCK_DEVICE_CONFIG='''
- local_loop:
    name: image0
    size: 240G

- partitioning:
    base: image0
    label: gpt
    partitions:
      - name: BSP
        type: 'EF02'
        size: 8MiB
      - name: root
        flags: [ boot ]
        size: 15GiB
        mkfs:
          type: xfs
          mount:
            mount_point: /
            fstab:
              options: "defaults"
              fsck-passno: 1
      - name: tmp
        size: 4GiB
        mkfs:
          type: xfs
          mount:
            mount_point: /tmp
            fstab:
              options: "rw,nosuid,nodev,noexec,relatime"
              fsck-passno: 2
      - name: var
        size: 10GiB
        mkfs:
          type: xfs
          mount:
            mount_point: /var
            fstab:
              options: "rw,relatime"
              fsck-passno: 2
      - name: log
        size: 6GiB
        mkfs:
          type: xfs
          mount:
            mount_point: /var/log
            fstab:
              options: "rw,relatime"
              fsck-passno: 3
      - name: k8s
        size: 100% # The rest of the disk
        mkfs:
          type: xfs
          mount:
            mount_point: /var/lib/containerd
            fstab:
              options: "rw,relatime"
              fsck-passno: 4
'''

# Version de ubuntu a instalar
export DIB_RELEASE=jammy

# Usuario que creamos en la imagen
export DIB_DEV_USER_USERNAME=USUARIO
export DIB_DEV_USER_PASSWORD=CLAVEUSUARIO
export DIB_DEV_USER_PWDLESS_SUDO=yes
export DIB_DEV_USER_AUTHORIZED_KEYS=$HOME/.ssh/CLAVE.pub

# Esto es para que funcione cloud-init con OpenStack o ConfigDrive (una partición con un label determinado donde estará la info)
export DIB_CLOUD_INIT_DATASOURCES="ConfigDrive, OpenStack"

# Después del nombre ponemos los "elements" que queremos usar para esta imagen.
disk-image-create -t qcow2 -o ubuntu-jammy-$(date +%Y%m%d) ubuntu cloud-init-nocloud block-device-gpt grub2 vm devuser
