http://galeracluster.com/documentation-webpages/userchanges.html

La database "mysql" no se replica porque es MyISAM
Esta tabla es la que gestiona los usuarios, por lo que INSERTS/DELETES en esa tabla no se replicarán.

Pero si usamos "CREATE USER"/"DROP USER" si se replicará (a nivel statement).
