It's useful to launch our app under profiling and save the results when it finishes or it's interrupted.
It relies on greenlet profiler (http://emptysqua.re/blog/greenletprofiler/) which also has a built in Yappi (https://code.google.com/p/yappi/) fixing some issues this last one had dealing with greenlets. 
The main advantage of these profilers over cProfile or hotshot (which is also deprecated) is that they can trace multithreaded programs and support using cpu time instead of wall clock time. Moreover, the callgrind output format is supported, so we can use fancy graphical tools such as kcachegrind (http://kcachegrind.sourceforge.net/html/Home.html) to analyze the results.

Mirar gprofile.py
