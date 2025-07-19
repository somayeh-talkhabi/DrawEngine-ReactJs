CREATE TABLE IF NOT EXISTS tickets (
    ticket_id SERIAL PRIMARY KEY,
    postalcode VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    housenumber VARCHAR(255),
    city VARCHAR(255),
    amount_of_tickets INTEGER
);

CREATE TABLE IF NOT EXISTS prizes (
    prize_id SERIAL PRIMARY KEY,
    amount_in_cents INTEGER
);

CREATE TABLE IF NOT EXISTS draws (
    draw_id SERIAL PRIMARY KEY,
    prize_id INTEGER,
    winning_postalcode VARCHAR(255)
);

ALTER TABLE draws
ADD CONSTRAINT prize_id_fk
FOREIGN KEY (prize_id)
REFERENCES prizes (prize_id)
ON DELETE SET NULL;
