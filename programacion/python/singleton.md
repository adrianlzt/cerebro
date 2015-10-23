class A(object):

    instance = None

    @staticmethod
    def new():
        if not A.instance:
            A.instance = new A()
        return A.instance
