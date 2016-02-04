Template:
"*.netapp3-performance.Clusters.CabinaProd.*.*.NFSV3.* ...cluster..svm.measurement.field environment=production",

Metricas:
.netapp3-performance.Clusters.CabinaProd.SVMs.svm_Prod.NFSV3.NFSV3_OPS 4018.83 1452616800
.netapp3-performance.Clusters.CabinaProd.SVMs.svm_Prod.NFSV3.NFSV3_THROUGHPUT 83261400.0 1452540600

InfluxDB:
> select * from NFSV3
name: NFSV3
-----------
time                    NFSV3_OPS       NFSV3_THROUGHPUT        cluster         environment     svm
1452540600000000000                     8.32614e+07             CabinaProd      production      svm_Prod
1452616800000000000     4018.83                                 CabinaProd      production      svm_Prod



