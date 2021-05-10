\echo 'inserting data into "users" table'
INSERT INTO users (username, password, email)
VALUES
('pig', '$2b$10$dN8fJunfRFrOXlcEqSgxTOl.fSuE2/BbJOC2/r/w8Xp6.s8OipgCG', 'pig@pig.com'),
('cat', '$2b$10$dN8fJunfRFrOXlcEqSgxTOl.fSuE2/BbJOC2/r/w8Xp6.s8OipgCG', 'cat@cat.com'),
('dog', '$2b$10$dN8fJunfRFrOXlcEqSgxTOl.fSuE2/BbJOC2/r/w8Xp6.s8OipgCG', 'dog@dog.com'),
('jaw', '$2b$10$dN8fJunfRFrOXlcEqSgxTOl.fSuE2/BbJOC2/r/w8Xp6.s8OipgCG', 'jaw@jaw.com');
\echo


\echo 'inserting data into "videos" table'
INSERT INTO videos (date, "videoUrl", title, message, "userId")
VALUES
('04/25/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig1', 'pig 1', 'pig 1', 1),
('04/26/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig2', 'pig 2', 'pig 2', 1),
('04/27/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig3', 'pig 3', 'pig 3', 1),
('04/28/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig4', 'pig 4', 'pig 4', 1),
('03/03/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat1', 'cat 1', 'cat 1', 2),
('03/04/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat2', 'cat 2', 'cat 2', 2),
('03/05/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat3', 'cat 3', 'cat 3', 2),
('03/06/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat4', 'cat 4', 'cat 4', 2),
('02/01/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog1', 'dog 1', 'dog 1', 3),
('02/02/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog2', 'dog 2', 'dog 2', 3),
('02/03/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog3', 'dog 3', 'dog 3', 3),
('02/04/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog4', 'dog 4', 'dog 4', 3),
('05/01/2021', '/images/squat.jpg', 'week 1 day 1', 'To day I felt strong', 4),
('05/02/2021', '/images/bench.jpg', 'week 1 day 2', 'To day I felt weak', 4),
('05/03/2021', '/images/deadlift.jpg', 'week 1 day 3', 'To day I felt hungry', 4),
('05/04/2021', '/images/computer.jpg', 'week 1 day 4', 'To day I felt computer', 4),
('05/05/2021', '/images/squat.jpg', 'week 2 day 1', 'To day I felt strong', 4),
('05/06/2021', '/images/bench.jpg', 'week 2 day 2', 'To day I felt weak', 4),
('05/07/2021', '/images/deadlift.jpg', 'week 2 day 3', 'To day I felt hungry', 4),
('05/08/2021', '/images/computer.jpg', 'week 2 day 4', 'To day I felt computer', 4);
\echo

\echo 'adding fk on "videos" from "users"'
ALTER TABLE "public"."videos" ADD FOREIGN KEY ("userId") REFERENCES "public"."users" ("id");
ALTER TABLE "public"."comments" ADD FOREIGN KEY ("videoId") REFERENCES "public"."videos" ("id");
ALTER TABLE "public"."comments" ADD FOREIGN KEY ("userId") REFERENCES "public"."users" ("id");
\echo

\echo 'inserting data into "comment" table'
INSERT INTO comments (date, comment, "videoId", "userId")
VALUES
('03/29/2021', 'This is so cool bruh', 12, 1),
('04/29/2021', 'Yeah, youre right', 12, 2),
('03/29/2021', 'You mirin', 12, 3),
('01/20/2021', 'You mirin', 3, 1),
('04/20/2021', 'You mirin', 3, 2),
('01/20/2020', 'Why too many screens?', 20, 2),
('02/20/2020', 'Do you even lift bruh?', 19, 1),
('01/03/2021', 'You mirin', 11, 1);
\echo

\echo 'updating "pig" profile picture'
UPDATE users 
SET "profilePictureUrl"=('/images/pig.jpg') 
WHERE id=(1);
\echo

\echo 'updating "cat" profile picture'
UPDATE users 
SET "profilePictureUrl"=('/images/cat.jpg') 
WHERE id=(2);
\echo

\echo 'updating "dog" profile picture'
UPDATE users 
SET "profilePictureUrl"=('/images/dog.jpg') 
WHERE id=(3);
\echo

\echo 'updating "jaw" profile picture'
UPDATE users 
SET "profilePictureUrl"=('/images/computer.jpg') 
WHERE id=(4);
\echo