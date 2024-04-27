ORM que suele ir unido a FastAPI.


# 1-to-N
```python
class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True)
    meetings: list["Meeting"] | None = Relationship(back_populates="recorder_user")


class Meeting(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    recorder_user_id: int | None = Field(default=None, foreign_key="user.id")
    recorder_user: User = Relationship(back_populates="meetings")
```

# Many-to-many
```python
class HeroTeamLink(SQLModel, table=True):
    team_id: int | None = Field(default=None, foreign_key="team.id", primary_key=True)
    hero_id: int | None = Field(default=None, foreign_key="hero.id", primary_key=True)


class Team(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    headquarters: str

    heroes: list["Hero"] = Relationship(back_populates="teams", link_model=HeroTeamLink)


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    secret_name: str
    age: int | None = Field(default=None, index=True)

    teams: list[Team] = Relationship(back_populates="heroes", link_model=HeroTeamLink)
```


# Migrations
https://github.com/tiangolo/sqlmodel/issues/85

No hay doc oficial aún. Parece que la gente usa alembic.

https://testdriven.io/blog/fastapi-sqlmodel/

1. Instalar alembic y asyncpg (si usamos postgres, hace falta que sea async)
2. Inicializarlo:
```bash
alembic init -t async migrations
```
3. Añadir "import sqlmodel" al migrations/script.py.mako
4. Editar migrations/env.py para añadir SQLModel y nuestros modelos.
5. Configurar url de la db en alembic.ini
6. Generar la primera migración (la generará en migrations/versions):
```bash
alembic revision --autogenerate -m "init"
```
7. Aplicar la migración:
```bash
alembic upgrade head
```

Para posteriores modificaciones:
1. Generar la migración:
```bash
alembic revision --autogenerate -m "nombre"
```
2. Aplicar la migración:
```bash
alembic upgrade head
```
