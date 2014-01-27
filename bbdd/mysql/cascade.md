# http://stackoverflow.com/questions/2914936/mysql-foreign-key-constraints-cascade-delete
# Ejemplo de on delete cascade

CREATE TABLE categories (
    id int unsigned not null primary key,
    name varchar(255) default null
);
CREATE TABLE products (
    id int unsigned not null primary key,
    name varchar(255) default null
);

CREATE TABLE categories_products (
    category_id int unsigned not null,
    product_id int unsigned not null,
    PRIMARY KEY (category_id, product_id),
    KEY pkey (product_id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
       ON DELETE CASCADE
       ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id)
       ON DELETE CASCADE
       ON UPDATE CASCADE
);
