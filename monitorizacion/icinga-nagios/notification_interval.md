notification_interval:

This directive is used to define the number of "time units" to wait before re-notifying a contact that this host is still down or unreachable. Unless you've changed the interval_length directive from the default value of 60, this number will mean minutes. If you set this value to 0, Icinga will not re-notify contacts about problems for this host - only one problem notification will be sent out. Floating point values are allowed. Default: 30.
