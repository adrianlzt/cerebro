Universally unique identifier”, or UUID, was designed to provide a consistent format for any unique ID we use for our data. UUIDs address the problem of generating a unique ID - either randomly, or using some data as a seed.

<https://www.uuidtools.com/uuid-versions-explained>

La versión del UUID se define en el 13 caracter del UUID.

```
00000000-0000-N000-0000-000000000000
```

# v1

UUID v1 is generated by using a combination the host computers MAC address and the current date and time. In addition to this, it also introduces another random component just to be sure of its uniqueness.

# v2

Based on the time (lossy), local machine's MAC address, and local user ID or group ID. Version 2 UUIDs are not widely used due to some limitations

# v3

Based on MD5 hash of a namespace and name

# v4

The generation of a v4 UUID is much simpler to comprehend. The bits that comprise a UUID v4 are generated randomly and with no inherent logic. Because of this, there is no way to identify information about the source by looking at the UUID.

# v5

If you want a unique ID that’s not random, UUID v5 could be the right choice.

Unlike v1 or v4, UUID v5 is generated by providing two pieces of input information:

Input string: Any string that can change in your application.
Namespace: A fixed UUID used in combination with the input string to differentiate between UUIDs generated in different applications, and to prevent rainbow table hacks