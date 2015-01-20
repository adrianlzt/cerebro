http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Pacemaker_Explained/s-resource-sets-collocation.html
http://clusterlabs.org/wiki/FAQ#Collocation_Sets
http://clusterlabs.org/mwiki/images/6/61/Colocation_Explained.pdf

Colocation is a location constraint that tells Pacemaker which resources to run together. It can specify any number of resources, and either an Inf: or -Inf: to specify whether these should be always run at the same location, or never at the same location.

colocation apache_with_vip inf: apache_MS0XP vip_VP03P

