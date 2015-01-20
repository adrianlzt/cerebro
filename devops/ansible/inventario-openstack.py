#!/usr/bin/env python

from __future__ import print_function
import os, sys, json

from novaclient.v1_1 import client

from ssh_cfg import process_ssh_cfg

def main():
    # Creating ssh.cfg file BEFORE host file is read
    # This is usefull to avoid problems connecting to managed machines before changing ssh.cfg in playbooks
    # This is a side-effect, it overwrites ssh.cfg file
    process_ssh_cfg()

    inventory = get_inventory()
    print(json.dumps(inventory, indent=4))

def get_inventory():
    credentials = get_credentials_from_environment()
    nt = client.Client(credentials['USERNAME'], credentials['PASSWORD'], credentials['TENANT_NAME'], credentials['AUTH_URL'], service_type="compute", insecure=True)
    groups = os.environ['DEPLOYMENT_GROUPS']
    deployment_groups = map(lambda x: x.strip(), groups.split(','))
    inventory = {"_meta": {"hostvars": {}}}

    for server in nt.servers.list():
        ansible_host_groups = server.metadata.get("ansible_host_groups")
        deployment_group = server.metadata.get("deployment_group")
        if (deployment_group in deployment_groups):
            if ansible_host_groups:
                ansible_host_groups = map(lambda x: x.strip(), ansible_host_groups.split(','))
                management_role = filter(lambda x: x == 'management', ansible_host_groups)
                non_management_roles = filter(lambda x: x != 'management', ansible_host_groups)

                if "private_management" in server.addresses:
                    floating_ips = filter(lambda x: x['OS-EXT-IPS:type'] == 'floating', server.addresses["private_management"])
                    fixed_ips = filter(lambda x: x['OS-EXT-IPS:type'] == 'fixed', server.addresses["private_management"])

                    if len(floating_ips) > 0 and len(management_role) == 1:
                        add_server_to_host_groups(management_role, server, floating_ips[0]['addr'], inventory)

                    if len(fixed_ips) > 0 and len(non_management_roles) > 0:
                        add_server_to_host_groups(non_management_roles, server, fixed_ips[0]['addr'], inventory)

    add_server_to_host_groups(['localhost'], 'localhost', 'localhost', inventory)

    return inventory

def add_server_to_host_groups(groups, server, ip_address, inventory):
    if ip_address is None:
        print("ERROR: no management IP for host: " + server.name)
        sys.exit(-1)

    for group in groups:
        server_name = server if type(server) is str else server.name
        host_group = inventory.get(group, {})
        hosts = host_group.get('hosts', [])
        hosts.append(server_name)
        host_group['hosts'] = hosts
        inventory[group] = host_group
        inventory["_meta"]["hostvars"].update({server_name: {"ansible_ssh_host": ip_address}})


def get_credentials_from_environment():
    credentials = {}
    try:
        credentials['USERNAME'] = os.environ['OS_USERNAME']
        credentials['PASSWORD'] = os.environ['OS_PASSWORD']
        credentials['TENANT_NAME'] = os.environ['OS_TENANT_NAME']
        credentials['AUTH_URL'] = os.environ['OS_AUTH_URL']
    except KeyError as e:
        print("ERROR: environment variable %s is not defined" % e, file=sys.stderr)
        sys.exit(-1)

    return credentials


if __name__ == "__main__":
    main()
