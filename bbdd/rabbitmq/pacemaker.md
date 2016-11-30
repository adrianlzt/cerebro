https://bugzilla.redhat.com/show_bug.cgi?id=1303803

We use to add a monitoring user like:

rabbitmqctl add_user nagios PASSWORD
rabbitmqctl set_user_tags nagios monitoring
rabbitmqctl set_permissions nagios ".*" ".*" ".*"

Every time RabbitMQ is restarted, permissions are lost for this user.

PR to backup also this perms:
https://github.com/lemenkov/resource-agents/pull/1



https://access.redhat.com/solutions/2374351
RabbitMQ user (and user tag) issue tracked in BZ 1316633 (https://bugzilla.redhat.com/show_bug.cgi?id=1316633) was fixed in RHBA-2016:0556 w/ the release of resource-agents-3.9.5-54.el7_2.8 (see following fix).

But RabbitMQ user permission issue tracked in BZ 1303803 and Merge pull request #1 from adrianlzt/bug/wipe_users_perms are still on-going.
Till getting newer ERRATA including additional fix for permissions, please re-add user permissions on every reboot of Rabbit RA.
