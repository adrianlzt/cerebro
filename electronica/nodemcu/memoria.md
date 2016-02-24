http://www.esp8266.com/wiki/doku.php?id=nodemcu-unofficial-faq

Avoid upvalues for context passed between event callbacks, as its very difficulat to get a handle on memory leaks created by these. Only use globals for this usecase.
Nil globals once they are no longer needed so that they can be properly GCed.
Allocate resources and create closures on a just-in-time basis.
The cost of require or dofile is relatively small, so break your program into overlays one per event and use a small stub function as a callback to load each.

If you structure your Lua this way then you will find that you can run surprisingly large Lua applications within the ESP8266 memory constraints.


Part 1: Lua has 2 types of functions local functions and global ones, the local functions does not take any heap although they contain too many lines, only global functions take heap size. So Make all of your functions are locals just one function is global which you should use it outside the file
Part 2: compile your code to generate ".lc" file and use it using require instead of dofile it is better for heap (un 10% mejor)
Part 3: do not set your code in init.lua just put in the require and call for the global function you made because dofile("secript.lua") takes more twice than dofile(script.lc) and require is the best
I follow these steps and my code now is more than 1000 line contains http server, mqtt, timers and files.... and it is working well with Only 23 kB of heap

The other trick is to make your diffferent code phases ephemeral as I describe in my Unofficial FAQ.
