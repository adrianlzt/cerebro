http://docs.ansible.com/get_url_module.html

- name: download foo.conf
  get_url: url=http://example.com/path/file.conf dest=/etc/foo.conf mode=0440

- name: download file with sha256 check
  get_url: url=http://example.com/path/file.conf dest=/etc/foo.conf sha256sum=b5bb9d8014a0f9b1d61e21e796d78dccdf1352f23cd32812f4850b878ae4944c

Definir una varible http_proxy=http://dondesea.com
- name: Download the tarball
  get_url: url={{ zookeeper_url }}/zookeeper-{{ zookeeper_version }}.tar.gz dest=/opt/zookeeper-{{ zookeeper_version }}.tar.gz
  environment:
    http_proxy: "{{proxy}}"


