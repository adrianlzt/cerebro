cosa1 = Cosa(1,2,3)
cosa2 = Cosa(2,3,4)

if cosa1==cosa2:
    ...


class Cosa(Object):
    def __eq__(self,other):
        return (self.name==other.name and self.command==other.command and self.period==other.period)
