Listar clusters:
aws eks list-clusters

Configurar kubectl
aws eks update-kubeconfig --name NOMBRE_CLUSTER

Tenemos que haber dado permisos a nuestro usuario en IAM para acceder al cluster EKS.
Permisos "super admin" AmazonEKSClusterAdminPolicy
