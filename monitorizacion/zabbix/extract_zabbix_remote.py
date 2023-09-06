#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
Get metrics from zabbix server or proxy using zabbix sender protocol with the zabbix.stats request type.
See https://www.zabbix.com/documentation/4.0/en/manual/appendix/items/remote_stats#exposed-metrics
"""

import socket
import json
import struct
import io
import argparse

parser = argparse.ArgumentParser(description='Get metrics from zabbix server or proxy using zabbix sender protocol with the zabbix.stats request type.')
parser.add_argument('--host', help='The host of the Zabbix server or proxy.', default='localhost')
parser.add_argument('--port', help='The port of the Zabbix server or proxy.', default=10051)
parser.add_argument('--queue', help='Use the queue request type.', action='store_true')
parser.add_argument('--from', help='The from value for the queue request type.', default='6s', dest='queue_from')
args = parser.parse_args()

# Create a TCP socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the Zabbix server
s.connect((args.host, args.port))

# Create a JSON payload with the request type and parameters
payload = {
    "request": "zabbix.stats"
}

if args.queue:
    payload["type"] = "queue"
    payload["params"] = {
        "from": args.queue_from
    }


# Convert the payload to a JSON string and encode it as bytes
payload = json.dumps(payload).encode()

# Add the ZBX header to the payload
header = b"ZBXD\x01" + struct.pack("<Q", len(payload)) # Q is for unsigned long long (8 bytes)
message = header + payload

# Send the message to the Zabbix server
s.send(message)

# Define the length of the ZBX header
header_length = 13

# Create an empty byte string for storing the response data
response_data = b""

# Receive the response data from the Zabbix server in chunks of 1024 bytes and append them to response_data until there is no more data to receive
while True:
    chunk = s.recv(1024)
    if not chunk:
        break
    response_data += chunk

# Create a stream object from response_data
stream = io.BytesIO(response_data)

# Move the pointer to the position after the ZBX header
stream.seek(header_length)

# Read the rest of the data and decode it as a JSON string
response_json = stream.read().decode()

print(response_json)

# Close the socket
s.close()
