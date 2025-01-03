# Pricing

<https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/#pricing>

Low-cost option for workloads that typically run at a low to moderate baseline CPU utilization, but sometimes need to burst to significantly higher CPU utilization when the demand rises.

ARM
B2pts v2 2vCPU 1 GiB 0 GiB €6.1792/month

x86_64
B2ts v2 2vCPU 1 GiB 0 GiB €7.7569/month
B2ls v2 2vCPU 4 GiB 0 GiB €31.0275/month

# Tipos de virtual-machines

A-series
Para desarrollo o webservers/dbs con poca carga. CPU/mem balanceado

B-series, burstable.
Parecidas a las A, pero que de vez en cuando tienen picos de CPU.

D-series, general compute
Da AMD epyc
D intel xeon
Dc para datos encriptados (trusted execution environment)

E-series memory optimized
Suele ser buena idea para las DBs
Más memoria.

M-series, más uso de memoria que las E

F-series, cpu optimized

L series, storage optimized.
Discos muy rápidos.

N series, para GPU

# Discos

Organizados de los más caros (mejores) a los más baratos.

## Ultra Disk Storage

lowest latency and consistent high IOPS/throughput. Ultra Disk offers unprecedented and extremely scalable performance with sub-millisecond latency

128GiB -> 14.9€/month (falta IOPS y Throughput)

## Premium SSD (Pn)

I/O intensive workloads with significantly high throughput and low latency

128 GiB -> €20.05/month

Premium SSD v2 Disk Storage is designed for performance-sensitive workloads that consistently require low average read and write latency combined with high IOPS and throughput.

128 GiB -> €9.6/month (falta IOPS y Throughput)

## Standard SSD (En)

test and entry-level production workloads requiring consistent latency

128 GiB -> €8.88/month

## Standard HDD (Sn)

dev/test and other infrequent access workloads that are less sensitive to performance variability

128 GiB -> €5.45/month

## extra disks y cloud-init

Si queremos montar extra discos con cloud-init, mirar este script:
<https://github.com/hashicorp/terraform-provider-azurerm/issues/6117#issuecomment-976428442>

## Mapear disco externo a lun y a dispositivo

Para encontrar el lun a partir de un nombre:

```bash
curl -sH Metadata:true --noproxy "*" "http://169.254.169.254/metadata/instance/compute/storageProfile?api-version=2021-02-01" | jq -r '.dataDisks[] | select(.name=="volume-docker") | .lun'
```

Para encontrar el device a partir del lun:

```bash
lsblk -o NAME,HCTL | grep ":${DOCKER_LUN}$" | cut -d ' ' -f 1)
```

Parece que los "dataDisks" no están aún en el metadata cuando arranca la VM, por lo que no podemos usarlo para el cloud-init.

# Aceso a internet

<https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/default-outbound-access>

Por defecto las VMs pueden salir a internet, aunque no tengan interfaz pública.
Si tienen un LB configurado, intentarán usar ese LB.

# az cli

mirar az.md

# user-data / custom-data

Parece que no es posible acceder al user-data/custom-data configurado en una VM tras su despliegue.
Únicamente desde dentro de la vm.

# Imágenes

Para sacar el listado de imágenes disponibles.

<https://stackoverflow.com/questions/57395138/how-to-set-the-virtual-machine-image-details-e-g-publisher-offer-sku-and-vers>

```bash
az vm image list -o table --all
az vm image list --offer GitLab -o table --all
```
