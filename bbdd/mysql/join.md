select u.name,g.name from user as u, group as g, user_group as ug WHERE u.id=ug.user_id AND g.id=ug.group_id;
