In [1]: from json import loads, dumps
In [2]: item_str = """{"name": "Super item 12345", "description": "This is the most amazing super item 12345",
   ...: "category": "Strange items", "price": 17.99, "stock": 3
   ...: }"""
In [3]: loads(item_str)
Out[3]: 
{u'category': u'Strange items',
 u'description': u'This is the most amazing super item 12345',
 u'name': u'Super item 12345',
 u'price': 17.99,
 u'stock': 3}
In [5]: from pymongo import Connection
In [6]: conn = Connection()
In [7]: conn.my_eshop_db.my_items_collection.insert(loads(item_str))
Out[7]: ObjectId('50b4ee504a4ee83864cb0c51')
In [9]: dumps(conn.my_eshop_db.my_items_collection.find_one({'name': "Super item 12345"}, {'_id': 0}))
Out[9]: '{"category": "Strange items", "price": 17.99, "stock": 3, "name": "Super item 12345", "description": "This is the most amazing super item 12345"}'
