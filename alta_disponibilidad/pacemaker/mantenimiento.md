http://www.hastexo.com/resources/hints-and-kinks/maintenance-active-pacemaker-clusters

Pacemaker essentially takes a "hands-off" approach to your cluster. Enabling Pacemaker maintenance mode is very easy using the Pacemaker crm shell: 
crm configure property maintenance-mode=true

In maintenance mode, you can stop or restart cluster resources at will. Pacemaker will not attempt to restart them. All resources automatically become unmanaged, that is, Pacemaker will cease monitoring them and hence be oblivious about their status.


You disable maintenance mode with the crm shell, as well:
crm configure property maintenance-mode=false


Este modo no genera logs.
