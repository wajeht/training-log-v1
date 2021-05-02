\echo 'creating "user" table'
CREATE TABLE users (
    id              SERIAL PRIMARY KEY NOT NULL,
    username        CHARACTER VARYING(100) NOT NULL,
    password        CHARACTER VARYING(100) NOT NULL,
    email           CHARACTER VARYING(100) NOT NULL
);
\echo