<https://news.ycombinator.com/item?id=42919909>

# subtrace

<https://github.com/subtrace/subtrace>

Seccomp BPF to intercept the socket, connect, listen, accept, and ~10 other syscalls, all TCP connections get proxied through Subtrace. We then parse the HTTP requests out of the TCP stream and then show it to the user in the Chrome DevTools Network tab, which we repurposed to work in the browser like a regular webapp

# kyanos

linux/tracers/kyanos_ebpf_tracer.md

Mirar kyanos (eBPF) para sacar tráfico para un proeso concreto. Permite ver tráfico TLS en plano.

# httptap

<https://github.com/monasticacademy/httptap>

# mitmproxy

mitmproxy uses eBPF to decrypt TLS traffic

<https://mitmproxy.org/posts/local-capture/linux/>
