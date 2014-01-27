http://valgrind.org/

Valgrind is an instrumentation framework for building dynamic analysis tools. There are Valgrind tools that can automatically detect many memory management and threading bugs, and profile your programs in detail. You can also use Valgrind to build new tools.

GUI -> alleyoop

http://stackoverflow.com/questions/131303/linux-how-to-measure-actual-memory-usage-of-an-application-or-process
With ps or similiar tools you will only get the amount of memory pages allocated by that process. This number is correct, but:
a) does not reflect the actual amount of memory used by the application, only the amount of memory reserved for it
b) can be misleading if pages are shared, for example by several threads or by using dynamically linked libraries
If you really want to know what amount of memory your application actually uses, you need to run it within a profiler. For example, valgrind can give you insights about the amount of memory used, and, more importantly, about possible memory leaks in your program.
