http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Pacemaker_Explained/_removing_a_corosync_node.html

crm_node --force -R master-1



http://clusterlabs.org/doc/en-US/Pacemaker/1.0/html/Pacemaker_Explained/s-node-delete.html

On the host to be removed:
Find and record the node's Corosync id: crm_node -i
Stop the cluster: /etc/init.d/corosync stop



Next, from one of the remaining active cluster nodes:

Tell the cluster to forget about the removed host: crm_node -R COROSYNC_ID
Only now is it safe to delete the node from the CIB with:
cibadmin --delete --obj_type nodes --crm_xml '<node uname="pcmk-1"/>'
cibadmin --delete --obj_type status --crm_xml '<node_state uname="pcmk-1"/>'




https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Cluster_Administration/s1-admin-manage-nodes-delete-add-cli-CA.html

