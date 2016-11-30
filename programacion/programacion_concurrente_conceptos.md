# Thread
Threads in the same process share the same process-level resources, such as memory and its address space, file descriptors, etc.
The operating system is in charge of handling threads, and the scheduler in the OS takes care of jumping between threads in a process
The operating system's scheduler will choose when to put a thread on pause and give control of the CPU to another thread for execution. This is called a context switch, and involves saving of the context of the current thread (e.g. CPU register values) and then loading the state of the target thread. Context switching can be somewhat expensive in that it itself requires CPU cycles.


http://sahandsaba.com/understanding-asyncio-node-js-python-3-4.html
Event Loops With Callbacks



https://blog.golang.org/concurrency-is-not-parallelism
In programming, concurrency is the composition of independently executing processes, while parallelism is the simultaneous execution of (possibly related) computations. Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once.
