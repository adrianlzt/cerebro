http://docs.ansible.com/playbooks_delegation.html
https://groups.google.com/forum/#!topic/Ansible-project/MU_ws7zynnI

Mirar serial.md

You can set the attribute "max_fail_percentage" on a 1.3 playbook and control the amount of failures to tolerate in a single batch size from within a rolling update.

There is also "any_errors_fatal: True" which is not specific to the "serial" keyword, and can also cause failures on exactly 1 failure.
any_errors_fatal is a setting that will cause the entire playbook to abort with failure if there are any tasks that fail in this play
