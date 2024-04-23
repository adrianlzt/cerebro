import threading
from queue import Queue
from random import randint
import time

# lock to serialize console output
lock = threading.Lock()

def do_work(item):
    time.sleep(.5) # pretend to do some lengthy work.
    with lock:
        print(threading.current_thread().name,item)

# Create the queue
q = Queue()

# The worker thread pulls an item from the queue and processes it
def worker():
    while True:
        item = q.get()
        try:
            do_work(item)
            print("task remaining: %s" % q.unfinished_tasks)
            print("task working: %s" % (q.unfinished_tasks-q.qsize()))
            if randint(0,10) > 7:
                print("Errr, requeue job %s" % item)
                q.put(item)
        except Exception as e:
            print(e)
        finally:
            q.task_done()

# Create thread pool.
for i in range(4):
    t = threading.Thread(target=worker)
    # Para pasar parámetros:
    # processThread = threading.Thread(target=processLine, args=(dRecieved));

    t.daemon = True  # thread dies when main thread (only non-daemon thread) exits.
    t.start()

# stuff work items on the queue (in this case, just a number).
start = time.perf_counter()
for item in range(20):
    q.put(item)

q.join()       # block until all tasks are done

# "Work" took .1 seconds per task.
# 20 tasks serially would be 2 seconds.
# With 4 threads should be about .5 seconds (contrived because non-CPU intensive "work")
print('time:',time.perf_counter() - start)
