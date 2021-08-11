\echo 'creating "users" table'
CREATE TABLE users (
    id                          SERIAL PRIMARY KEY NOT NULL,
    email                       CHARACTER VARYING(100) NOT NULL,
    username                    CHARACTER VARYING(100) NOT NULL,
    password                    CHARACTER VARYING(100) NOT NULL,
    "isAdmin"                  BOOLEAN DEFAULT FALSE,
    "profilePictureUrl"         CHARACTER VARYING(500),
    "resetToken"                CHARACTER VARYING(500),
    "resetTokenExpiration"      TIMESTAMP 
);
\echo