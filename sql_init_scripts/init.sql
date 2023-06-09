-- structure migrations
CREATE TABLE meetup
(
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255)             not null,
    description VARCHAR(255),
    tags        VARCHAR(255)[],
    place       VARCHAR(255),
    time        timestamp with time zone not null
);

-- test data migrations
INSERT INTO meetup (name, description, tags, place, time)
VALUES ('Daily meeting', 'This is usually daily meeting', '{#daily,#lol}', 'virtually', '2023-01-01 15:00:00.000000 +00:00'),
       ('Planning meeting', 'This is usually daily meeting', '{#planning,#test}', 'virtually',
        '2023-01-01 10:00:00.000000 +00:00');