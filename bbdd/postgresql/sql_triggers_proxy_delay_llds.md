Solución para el problema de que muchos telegraf envían los LLDs sincronizados a en punto, provocando una carga muy alta.

Solución que propaga esos LLDs durante un periodo de tiempo más grande.


Ejemplo para enviar un LLD a mano:
zabbix_sender -z 127.0.0.1 -p 10052 -s hostlld -k lld -o '{"data":[{"{#VAR}": "abc"}]}'

Si queremos insertarlo a mano en la tabla:
insert into proxy_history (itemid,clock,ns,value) values (28877,1689852629,498430889,'{"data":[{"{#VAR}": "zxc"}]}');



Trigger que mete las cosas que van a la tabla proxy_history en la tabla proxy_history_bis cuando se da una condición (que sería que esté cerca de la hora en punto).

CREATE TABLE proxy_history_bis (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    itemid bigint,
    clock integer,
    ns integer,
    value text
);

CREATE OR REPLACE FUNCTION proxy_history_trigger ()
    RETURNS TRIGGER
    AS $$
BEGIN
    IF EXTRACT(SECOND FROM now()) < 30 THEN -- cambiar para que sea valores cerca de la hora y solo LLDs
        INSERT INTO proxy_history_bis (itemid, clock, ns, value)
            VALUES (NEW.itemid, NEW.clock, NEW.ns, NEW.value);
        RETURN NULL;
    ELSE
        RETURN NEW;
    END IF;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER proxy_history_trigger
    BEFORE INSERT ON proxy_history
    FOR EACH ROW
    EXECUTE PROCEDURE proxy_history_trigger ();





Función para mover los valores de la tabla proxy_history_bis a proxy_history.
No mueve nada si estamos en el periodo donde el trigger mete la info en la tabla proxy_history_bis, así evitamos mover los datos nuevos al final de la tabla.


CREATE OR REPLACE FUNCTION move_last_items ()
    RETURNS bool
    AS $$
DECLARE
    ROWS integer := 3;
BEGIN
    IF EXTRACT(SECOND FROM now()) >= 30 THEN -- TODO poner el condicional invertido del trigger
        INSERT INTO proxy_history (itemid, clock, ns, value)
        SELECT
            itemid,
            clock,
            ns,
            value
        FROM
            proxy_history_bis
        ORDER BY
            id ASC
        LIMIT ROWS;
        DELETE FROM proxy_history_bis
        WHERE id IN (
                SELECT
                    id
                FROM
                    proxy_history_bis
                ORDER BY
                    id ASC
                LIMIT ROWS);
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END;
$$
LANGUAGE plpgsql;
