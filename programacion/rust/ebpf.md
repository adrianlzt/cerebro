https://aya-rs.dev/book/
https://docs.rs/crate/aya/latest
https://docs.rs/aya-ebpf/latest/aya_ebpf/
https://confused.ai/posts/rust-bpf-target

Necesitamos rust stable y nightly.
También necesitamos instalar el linker de bpf (https://github.com/aya-rs/bpf-linker)
cargo install bpf-linker

Por un lado crearemos un programa en rust que será el que se compile a ebpf (eBPF component).
Y por otro lado el componente que correrá en userspace y obtendrá los valores del primer componente.


En el componente eBPF definiremos un "program":
```rust
#[xdp]
pub fn xdp_hello(ctx: XdpContext) -> u32 {
    match unsafe { try_xdp_hello(ctx) } {
        Ok(ret) => ret,
        Err(_) => xdp_action::XDP_ABORTED,
    }
}
```

En el componente userspace lo cargaremos (debe coincidir el nombre del programa):
```rust
let program: &mut Xdp = bpf.program_mut("xdp_hello").unwrap().try_into()?;
program.load()?;
program.attach(&opt.iface, XdpFlags::default())?;
```

# Tracepoints
https://docs.rs/aya/0.11.0/aya/programs/trace_point/struct.TracePoint.html

Para mirar los formatos:
/sys/kernel/debug/tracing/events/

Para leer un dato, tenemos que saber el offset y el tamaño del dato.
Por ejemplo, para ler el file descriptor de la syscall enter_connect:
https://github.com/aya-rs/aya/issues/503#issuecomment-1412169320
```rust
// sudo cat /sys/kernel/debug/tracing/events/syscalls/sys_enter_connect/format
//         field:int fd;   offset:16;      size:8; signed:0;
const FD_OFFSET: usize = 16;
let fd: u32 = unsafe {ctx.read_at(FD_OFFSET)?};
```


# uprobes / uretprobes

## Ejemplo
git clone https://github.com/elbaro/mybee.git
cd mybee
docker run --rm -it -v $PWD:/mnt -w /mnt rust bash
cargo install bpf-linker
cargo b

## USDT
https://github.com/aya-rs/aya/pull/329





# aya_log
https://docs.rs/aya-log/latest/aya_log/

info!(&ctx, "PID={} tracepoint tcp:tcp_send_reset called", pid);

Para imprimir datos desde el programa eBPF se puede usar aya_log.


# aya_tool
https://aya-rs.dev/book/aya/aya-tool/

Generar código rust para el módulo eBPF que nos permita cargar type definitions del kernel.
