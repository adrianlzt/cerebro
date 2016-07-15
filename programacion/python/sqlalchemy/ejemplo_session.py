#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""
http://docs.sqlalchemy.org/en/latest/orm/session_basics.html#getting-a-session
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# an Engine, which the Session will use for connection
# resources
some_engine = create_engine('postgresql://scott:tiger@localhost/')

# create a configured "Session" class
Session = sessionmaker(bind=some_engine)

# create a Session
session = Session()

# work with sess
myobject = MyObject('foo', 'bar')
session.add(myobject)
session.commit()

# Ejecutar querys custom
result = session.execute(
            "SELECT * FROM user WHERE id=:param",
            {"param":5}
        )

# Obtener el engine a partir de la session
eng = session.get_bind()
eng.has_table("config")
