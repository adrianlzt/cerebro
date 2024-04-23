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
