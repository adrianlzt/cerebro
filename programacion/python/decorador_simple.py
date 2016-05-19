from functools import wraps

def mi_decorador(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print("inicio decorador")
        ret = f(*args, **kwargs)
        print("fin decorador")

        return ret
    return wrapper

@mi_decorador
def main():
    print("funcion main")

if __name__ == "__main__":
    main()
