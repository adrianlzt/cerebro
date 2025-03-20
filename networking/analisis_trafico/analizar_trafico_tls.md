<https://news.ycombinator.com/item?id=42919909>

<https://blog.px.dev/ebpf-tls-tracing-past-present-future/>
Resumen del estado del arte en 2024.

# bcc tools - sslsniff

<https://github.com/iovisor/bcc/blob/master/tools/sslsniff_example.txt>

Bug, corregido? <https://github.com/iovisor/bcc/pull/5242>

Arch: bcc-tools

/usr/share/bcc/tools/sslsniff

# subtrace

<https://github.com/subtrace/subtrace>

Seccomp BPF to intercept the socket, connect, listen, accept, and ~10 other syscalls, all TCP connections get proxied through Subtrace. We then parse the HTTP requests out of the TCP stream and then show it to the user in the Chrome DevTools Network tab, which we repurposed to work in the browser like a regular webapp

```bash
curl -fSLO "https://subtrace.dev/download/$(uname -s)/$(uname -m)/subtrace" && chmod +x ./subtrace
subtrace run -- comando
```

Imprime un link que nos lleva a una web con el formato del inspector de red de Chrome donde podemos ver las peticiones (TLS descifrado incluído).

En principio está pensado para apliacciones que se queden levantadas, pero podemos arrancar bash y capturar todo lo que se ejecute ahí:

```bash
subtrace run -- bash
```

Intentando analizar `claude-desktop-native` salen errores:

```
time=2025-03-20T07:34:36.841+01:00 level=ERROR src=cmd/run/socket/proxy.go:135 msg="failed to run tcp proxy" proxy.outgoing=true proxy.process.local=[::1]:39295 proxy.process.remote=[::1]:47860 proxy.external.local=[2a01:e0a:234:3830:7df9:c8ac:7a9c:52cb]:41347 proxy.external.remote=[2607:6bc0::10]:443 err="proxy tls handshake: handshake downstream: remote error: tls: unknown certificate"
```

# kyanos

linux/tracers/kyanos_ebpf_tracer.md

Mirar kyanos (eBPF) para sacar tráfico para un proeso concreto. Permite ver tráfico TLS en plano.

# httptap

<https://github.com/monasticacademy/httptap>

aur/httptap-bin

```bash
httptap -- curl http://eth0.me
httptap --head --body -- curl http://eth0.me
```

Podemos hacer un dump a un .har para luego verlo en el inspector de red de Firefox o Chrome:

```bash
httptap --dump-har out.har -- curl -Lso /dev/null https://monasticacademy.org
```

# mitmproxy

mitmproxy usa eBPF para enviar el tráfico de un proceso a través de mitmproxy. No tengo claro que decifre TLS.

<https://mitmproxy.org/posts/local-capture/linux/>

# Inpector Gadget / kubernetes

<https://inspektor-gadget.io/docs/latest/gadgets/trace_ssl/>
