https://github.com/iurisilvio/bottle-sqlalchemy

pip install bottle_sqlalchemy

# Inicializacion plugin
from sqlalchemy import create_engine, Column, Integer, Sequence, String
from bottle.ext import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
import os

bottle = Bottle()
engine = create_engine(os.environ["DATABASE_URL"], echo=True)
Base = declarative_base()
plugin = sqlalchemy.Plugin(
    engine, # SQLAlchemy engine created with create_engine function.
    Base.metadata, # SQLAlchemy metadata, required only if create=True.
    keyword='db', # Keyword used to inject session database in a route (default 'db').
    create=True, # If it is true, execute `metadata.create_all(engine)` when plugin is applied (default False).
    commit=True, # If it is true, plugin commit changes after route is executed (default True).
    use_kwargs=False # If it is true and keyword is not defined, plugin uses **kwargs argument to inject session database (default False).
)

bottle.install(plugin)

@bottle.get('/')
def index(db):
    pass


db es un objeto Session

# Objeto
Hace falta declarar una variable como primary_key
Y tambien poner el __tablename__

Crear objeto mapeado a una tabla:
class Entity(Base):
    __tablename__ = 'entity'
    id = Column(Integer, Sequence('id_seq'), primary_key=True)
    name = Column(String(50))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Entity('%d', '%s')>" % (self.id, self.name)

Todos los objetos que hayan heredado el objeto Base serán los que se creen en la bbdd.

# Query
entity = db.query(Entity).filter_by(name=name).first()

# Crear e insertar
entity = Entity(name)
db.add(entity)
