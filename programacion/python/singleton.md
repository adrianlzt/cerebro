http://blog.amir.rachum.com/blog/2012/04/26/implementing-the-singleton-pattern-in-python/

No me funciona:
class A(object):

    instance = None

    @staticmethod
    def new():
        if not A.instance:
            A.instance = new A()
        return A.instance
