import sys
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class mimanejador(FileSystemEventHandler):
    def on_any_event(self, event):
        x=1
        #print event

    def on_created(self, event):
        if event.is_directory:
            print "dir creado " + event.src_path
        else:
            print "fichero creado " + event.src_path

    def on_deleted(self, event):
        if event.is_directory:
            print "dir borrado " + event.src_path
        else:
            print "fichero borrado " + event.src_path

    # Si se crea un fichero o directorio tambien salta este metodo
    def on_modified(self, event):
        if event.is_directory:
            print "dir modificado " + event.src_path
        else:
            print "fichero modificado " + event.src_path

    def on_moved(self, event):
        if event.is_directory:
            print "dir moved " + event.src_path
        else:
            print "fichero moved " + event.src_path

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    event_handler = mimanejador()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
