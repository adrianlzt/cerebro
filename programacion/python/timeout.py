import time

timeout = 5
start = time.time()
while time.time() - start < timeout:
    print("corriendo")
    time.sleep(1)

print("fin")
