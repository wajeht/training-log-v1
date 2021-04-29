\echo 'creating "videos" table'
CREATE TABLE users (
    id integer not null,
    username character varying(25) not null,
    password character varying(1000) not null,
    videoId integer not null
);
\echo 

\echo 'inserting data into "users" table'
INSERT INTO users (id, username, password, videoId)
VALUES
(1, 'yanllone', 'password', 1);
\echo 