http://flask.pocoo.org/docs/patterns/sqlalchemy/



from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class SomeClass(Base):
    __tablename__ = 'some_table'
    id = Column(Integer, primary_key=True)
    name =  Column(String(50))

Tenemos que crear el objeto Base y que todas las clases hereden de él.
Posteriormente estos objetos que hayan heredado Base serán los que se crearán en la bbdd:
http://docs.sqlalchemy.org/en/latest/orm/extensions/declarative/basic_use.html#accessing-the-metadata
