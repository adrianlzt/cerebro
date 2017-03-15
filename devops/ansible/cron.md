http://docs.ansible.com/ansible/cron_module.html

- cron:
    name: yum autoupdate
    weekday: 2
    minute: 0
    hour: 12
    user: root
    job: "YUMINTERACTIVE: 0 /usr/sbin/yum-autoupdate"
    cron_file: ansible_yum-autoupdate
