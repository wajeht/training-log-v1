\echo 'creating "comments" table'
CREATE TABLE comments (
    id          SERIAL PRIMARY KEY NOT NULL,
    date        TIMESTAMP NOT NULL,
    comment     CHARACTER VARYING(100) NOT NULL,
    "videoId"   INTEGER NOT NULL,
    "userId"    INTEGER NOT NULL
);
\echo