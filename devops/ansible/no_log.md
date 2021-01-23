https://docs.ansible.com/ansible/latest/reference_appendices/logging.html

If you save Ansible output to a log, you expose any secret data in your Ansible output, such as passwords and user names. To keep sensitive values out of your logs, mark tasks that expose them with the no_log: True attribute. However, the no_log attribute does not affect debugging output, so be careful not to debug playbooks in a production environment. See How do I keep secret data in my playbook? for an example.


no_log: true
