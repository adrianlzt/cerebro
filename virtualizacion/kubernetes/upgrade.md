https://github.com/rikatz/kubepug

KubePug/Deprecations is intended to be a kubectl plugin, which:
    Downloads a swagger.json from a specific Kubernetes version
    Parses this Json finding deprecation notices
    Verifies the current kubernetes cluster or input files checking whether exists objects in this deprecated API Versions, allowing the user to check before migrating
