http://docs.ansible.com/ansible/latest/oc_module.html

Ejemplo crear un template:
- name: create app to reach fluent agent monitoring endpoint
  hosts: localhost
  gather_facts: false
  vars:
    openshift_url: "openshift.inet"
    token: "xxx"
    namespace: "NOMBRE"
  tasks:
    - name: secret
      oc:
        state: present
        host: "{{openshift_url}}"
        port: 443
        token: "{{token}}"
        validate_certs: False
        def:
          apiVersion: v1
          kind: Secret
          metadata:
            name: "fluent-monitoring"
            namespace: "{{namespace}}"
          stringData:
            auth-token: "{{token}}"
    - name: service
      oc:
        state: present
        host: "{{openshift_url}}"
        port: 443
        token: "{{token}}"
        validate_certs: False
        def:
          apiVersion: v1
          kind: Service
          metadata:
            name: "fluent-monitoring"
            namespace: "{{namespace}}"
          spec:
            ports:
            - port: 80
              targetPort: 8080
            selector:
              deploymentconfig: "fluent-monitoring"

