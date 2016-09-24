https://github.com/iovisor/bcc/blob/master/docs/reference_guide.md

Si queremos crear nuestra propia herramienta para usar eBPF podemos mirar el ejemplo sencillo: example.py

En lineas generales:

 - Escribiremos un funcion en c que trata los datos
 - Inicializaremos bpf
 - Uniremos unos eventos al programa en c
 - Trataremos los datos en la app python para imprimirlos


Otro ejemplo obteniendo valores, más complejo:
https://github.com/iovisor/bcc/blob/master/examples/tracing/trace_perf_output.py


# Parte c

int kprobe__tcp_v4_connect(struct pt_regs *ctx, struct sock *sk)
    [...]
}


Al declarar la funcion probe podemos poner como argumentos solo el contexto, o el contexto mas los params de la funcion que estamos probeando:
int probe_SSL_write(struct pt_regs *ctx, void *ssl, void *buf, int num) {


This instruments the tcp_v4_connect() kernel function using a kprobe, with the following arguments:

struct pt_regs *ctx: Registers and BPF context.
struct sock *sk: First argument to tcp_v4_connect().


Para leer el primer argumento en una variable del struct __data:
bpf_probe_read(&__data.v0, sizeof(__data.v0), (unsigned char*) PT_REGS_PARM1(ctx));

Las macros PT_REGS... estan definidas en http://lxr.free-electrons.com/source/samples/bpf/bpf_helpers.h#L76
En x86_64 podriamos hacer:
bpf_probe_read(&__data.v0, sizeof(__data.v0), (unsigned char*) ctx->di);

ctx es un struct de registros, definido en: http://lxr.free-electrons.com/source/arch/x86/include/asm/ptrace.h#L33
programacion/asm/registros.md

Parece que al pasar datos con BPF_PERF_OUTPUT tenemos una limitacion de tamaño: 512 bytes

# Parte python

// aqui metemos el programa en c
// Si tenemos que poner el simbolo '\' tendremos que escaparlo: '\\'
variable_texto = """
int miapp(void *ctx) {
  return 0;
}
"""

b = BPF(text=variable_texto)
b.attach_uprobe(name="/usr/lib/libreria.so", sym="symbolo", fn_name="miapp", pid=-1)
// pid=-1 si no queremos unirnos a un pid en particular


Para pasar datos de perf entre el programa en c y el python 

Programa en c:
  BPF_PERF_OUTPUT(CLAVE);
  ...
  CLAVE.perf_submit(ctx, &data, sizeof(data));
  // Data generalmente sera un struct con las cosas que queremos enviar

En python:

  Definiremos una estructura de datos en python similar a lue definimos en c

  def print_event(cpu, data, size):
    event = ct.cast(data, ct.POINTER(Data)).contents
    print("cosa")
  
  b["CLAVE"].open_perf_buffer(print_event)
  while 1:
      b.kprobe_poll()


## Debug
https://github.com/iovisor/bcc/blob/9b04a6ffeb7f7d7ba1a1d7df56571e938b6e1190/src/python/bcc/__init__.py#L162

Para poner debug
BPF(text=.., debug=bpf.DEBUG_PREPROCESSOR|bpf.DEBUG_BPF|bpf.DEBUG_LLVM_IR)|bpf.DEBUG_LLVM_IR)
