#!/usr/bin/env python

import sys
from login import login_check

class Main:
    def __init__(self):
        self.nombre = "xYd7"

    @login_check
    def run(self):
        print("la clave es: " + self.nombre)

if __name__ == "__main__":
    main = Main()
    main.run()
