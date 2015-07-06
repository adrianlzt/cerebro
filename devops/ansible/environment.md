- name: Output env vars
  shell: echo $PATH $ANDROID_HOME > path.txt
  environment:
    ANDROID_HOME: "/home/{{ deploy_user }}/android-sdk-linux"
    PATH: "{{ ansible_env.ANDROID_HOME }} /tools:/platform-tools:{{ ansible_env.PATH }}"

Los {{}} no se cambiarán por sus valores e irán tal cual al PATH


- name: Download the tarball
  get_url: url={{ zookeeper_url }}/zookeeper-{{ zookeeper_version }}.tar.gz dest=/opt/zookeeper-{{ zookeeper_version }}.tar.gz
  environment:
    http_proxy: "{{proxy}}"


