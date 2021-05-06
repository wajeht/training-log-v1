\echo 'creating "users" table'
CREATE TABLE users (
    id              SERIAL PRIMARY KEY NOT NULL,
    email           CHARACTER VARYING(100) NOT NULL,
    username        CHARACTER VARYING(100) NOT NULL,
    password        CHARACTER VARYING(100) NOT NULL,
    "isClient"      BOOLEAN DEFAULT FALSE
);
\echo