-- \echo 'inserting data into "users" table'
INSERT INTO users (username, password, email)
VALUES
('pig', '$2b$10$dN8fJunfRFrOXlcEqSgxTOl.fSuE2/BbJOC2/r/w8Xp6.s8OipgCG', 'pig@pig.com'),
('cat', '$2b$10$dN8fJunfRFrOXlcEqSgxTOl.fSuE2/BbJOC2/r/w8Xp6.s8OipgCG', 'cat@cat.com'),
('dog', '$2b$10$dN8fJunfRFrOXlcEqSgxTOl.fSuE2/BbJOC2/r/w8Xp6.s8OipgCG', 'dog@dog.com');
-- \echo


-- \echo 'inserting data into "video" table'
INSERT INTO videos (date, "videoUrl", title, message, "userId")
VALUES
('04/29/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig1', 'pig 1', 'pig 1', 1),
('04/29/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig2', 'pig 2', 'pig 2', 1),
('04/29/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig3', 'pig 3', 'pig 3', 1),
('04/29/2021', 'https://dummyimage.com/500x500/000/fff.jpg&text=pig4', 'pig 4', 'pig 4', 1),
('04/30/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat1', 'cat 1', 'cat 1', 2),
('04/30/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat2', 'cat 2', 'cat 2', 2),
('04/30/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat3', 'cat 3', 'cat 3', 2),
('04/30/2021', 'https://dummyimage.com/500x500/a31fa3/ffffff.jpg&text=cat4', 'cat 4', 'cat 4', 2),
('05/01/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog1', 'dog 1', 'dog 1', 3),
('05/01/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog2', 'dog 2', 'dog 2', 3),
('05/01/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog3', 'dog 3', 'dog 3', 3),
('05/01/2021', 'https://dummyimage.com/500x500/f59b00/ffffff.jpg&text=dog4', 'dog 4', 'dog 4', 3);
-- \echo



-- \echo "adding fk on videos from user"
ALTER TABLE "public"."videos" ADD FOREIGN KEY ("userId") REFERENCES "public"."users" ("id");