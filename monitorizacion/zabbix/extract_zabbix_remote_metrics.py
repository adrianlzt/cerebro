#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#

"""
Get metrics from zabbix server or proxy using zabbix sender protocol with the zabbix.stats request type.
"""

# Import the socket, json, struct, and io modules
import socket
import json
import struct
import io

# Define the host and port of the Zabbix server
host = "localhost"
port = 10051

# Create a TCP socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the Zabbix server
s.connect((host, port))

# Create a JSON payload with the request type and parameters
payload = {
"request": "zabbix.stats", # Use the correct request type
"type": 0 # Use 0 for agent data or 1 for sender data
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

# Parse the JSON string and assign it to response_data
response_data = json.loads(response_json)

# Close the socket
s.close()
