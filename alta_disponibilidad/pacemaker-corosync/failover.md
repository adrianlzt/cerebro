http://clusterlabs.org/doc/en-US/Pacemaker/1.0/html/Pacemaker_Explained/s-failure-migration.html

# crm resource
crm(live)resource# failcount
usage:
        failcount <rsc> set <node> <value>
        failcount <rsc> delete <node>
        failcount <rsc> show <node>


New in 1.0 is the concept of a migration threshold [9]. Simply define migration-threshold=N for a resource and it will migrate to a new node after N failures. There is no threshold defined by default. To determine the resource's current failure status and limits, use crm_mon --failcounts

By default, once the threshold has been reached, node will no longer be allowed to run the failed resource until the administrator manually resets the resource's failcount using crm_failcount (after hopefully first fixing the failure's cause). However it is possible to expire them by setting the resource's failure-timeout option.

So a setting of migration-threshold=2 and failure-timeout=60s would cause the resource to move to a new node after 2 failures and potentially allow it to move back (depending on the stickiness and constraint scores) after one minute.

There are two exceptions to the migration threshold concept and occur when a resource either fails to start or fails to stop. Start failures cause the failcount to be set to INFINITY and thus always cause the resource to move immediately.

Stop failures are slightly different and crucial. If a resource fails to stop and STONITH is enabled, then the cluster will fence the node in order to be able to start the resource elsewhere. If STONITH is not enabled, then the cluster has no way to continue and will not try to start the resource elsewhere, but will try to stop it again after the failure timeout.
