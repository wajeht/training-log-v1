\echo 'inserting data into "video" table'
INSERT INTO videos (date, "videoUrl", title, message)
VALUES
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 1 day 1', 'Today, I feel really strong. I goota eat more food'),
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 1 day 2', 'Today, I feel really strong. I goota eat more food'),
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 1 day 3', 'Today, I feel really strong. I goota eat more food'),
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 1 day 4', 'Today, I feel really strong. I goota eat more food'),
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 2 day 1', 'Today, I feel really strong. I goota eat more food'),
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 2 day 2', 'Today, I feel really strong. I goota eat more food'),
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 2 day 3', 'Today, I feel really strong. I goota eat more food'),
('04/29/2021', 'https://jaw.cool/images/profile.jpg', 'week 2 day 4', 'Today, I feel really strong. I goota eat more food');
\echo

\echo 'inserting data into "users" table'
INSERT INTO users (username, password, email)
VALUES
('soapwa', 'password', 'soapwa@dog.com'),
('yanllone', 'password', 'yanlon@dog.com');


