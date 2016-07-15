c = db.query(Config).first()
c.dni = dni
c.password = password
c.fecha_nacimiento = fecha
db.commit()

