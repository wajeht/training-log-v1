\echo 'creating "videos" table'
CREATE TABLE videos (
    id integer not null,
    date date not null,
    videoUrl character varying(100) not null,
    message character varying(1000) not null,
    userId integer not null
);
\echo 


\echo 'inserting data into "videos" table'
INSERT INTO videos (id, date, videoUrl, message, userId)
VALUES
(1, '04/29/2021', 'http://jaw.cool/dog.mp4', 'Today, I feel really strong. I goota eat more food',1);
\echo 