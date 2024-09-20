http://aws.amazon.com/es/ec2/vmimport

create-instance-export-task --instance-id ... que mas?


http://docs.aws.amazon.com/AWSEC2/latest/CommandLineReference/ApiReference-cmd-CreateInstanceExportTask.html


## COSTES ##
VM Import/Export es una característica de Amazon EC2 y está disponible sin ningún cargo adicional, al margen de las cuotas de servicio de Amazon EC2. El almacenamiento en Amazon S3 y EBS se utiliza durante el proceso de importación y exportación y se factura por separado.

A modo de ejemplo, la importación de una imagen de VMware de 10 GB de Windows Server 2008 costaría 0,04 USD por 1 día de almacenamiento S3 (0,125 USD por GB/mes x 10 GB/30 días). Además, se aplicarán cargos de EBS a 0,10 USD por GB-mes respecto al volumen de EBS que contenga la instancia de copia de seguridad en EBS.

La exportación de la misma instancia de EC2 anterior generará cargos de 1,25 USD al mes (0,125 USD por GB/mes x 10 GB) por el almacenamiento de S3 de la máquina virtual exportada. Además, se le cargará una cuantía reducida (normalmente menos de 1 USD) por el uso temporal del almacenamiento de EBS durante el proceso de exportación.

