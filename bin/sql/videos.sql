\echo 'creating "videos" table'
CREATE TABLE videos (
    id integer not null,
    date date not null,
    videoUrl character varying(100) not null,
    title character varying(50) not null,
    message character varying(1000) not null,
    userId integer not null
);
\echo 


\echo 'inserting data into "videos" table'
INSERT INTO videos (id, date, videoUrl, title, message, userId)
VALUES
(1, '04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 1 day 1', 'Today, I feel really strong. I goota eat more food',1),
(8, '1/30/1993', 'https://jaw.cool/images/attempt_calculator.jpg', 'week 3 day 4', 'Lifting sucks. I should run instead!',1);
\echo 