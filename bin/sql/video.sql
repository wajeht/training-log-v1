\echo 'creating "video" table'
CREATE TABLE videos (
    id          SERIAL PRIMARY KEY NOT NULL,
    date        TIMESTAMP NOT NULL, 
    "videoUrl"  CHARACTER VARYING(100) NOT NULL,
    title       CHARACTER VARYING(100) NOT NULL,
    message     CHARACTER VARYING(100) NOT NULL
);
\echo