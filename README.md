<p align="center"><img src="./src/public/images/logo/training-vlog.png" width="400"></p>

# <p align="center">training-vlog</p>

<p align="center">A full-stack web application to log tainting videos from a 4 days split.</p>

# Motivation

Instagram is the best medium for powerlifters among other social media. Back in the day, YouTube used to be it. Ever since powerlifting has gotten popular, majority of the content usually reside on Instagram.

Instagram used to be really good before facebook bought it. Now it has gotta a lot worse with unrelated contents. It has also gotten a lot worse on the aspect of privacy. So I decided to ditch Instagram and build my own platform to log my training.

# Demo

I have a live prototype running at the link below.

```
https://tvl.jawstrength.com/
```

# Screenshot

<img src="./.github/screenshots/single_video.png" width="200"><img src="./.github/screenshots/home_page.png" width="200">

# Technology

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />‏‎ ‎‏‎
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> ‎‏‎
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />‏‎ ‎‏‎
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> ‎
<img src="https://img.shields.io/badge/Docker-0081CB?style=for-the-badge&logo=docker&logoColor=white" />‏‎ ‎‏‎
<img src="https://img.shields.io/badge/CSS3-239120?&style=for-the-badge&logo=css3&logoColor=white" />‏‎ ‎‏‎
<img src="https://img.shields.io/badge/Materialed--CSS-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" />‏‎ ‎‏‎

# Database configuration

Within this project I have include `.evn.example` file with secret credentials. Name that file to `.env` and put in proper credentials. There is also `.pg_password.example.sh` file inside `/bin` folder. Rename it to `.pg_password.sh` and put proper credentials. Also make sure to install `postgresql` database and create proper account first and password first.

I use my email as SMTP server. and OR you can use SendGrid as your mailing stuff!

## For `.pg_password.sh` file inside `/bin` folder

```bash
#!/bin/sh
export DB_PASSWORD=YOUR_PG_DATABASE_PASSWORD
```

## For `.env` file

```bash
# Port
PORT=3000

# Database connection
DB_HOST="localhost"
DB_USERNAME="node_user"
DB_PASSWORD="node_password"
DB_DATABASE="node_database"
DB_PORT=5432

# Express cookie
COOKIE_SECRET="THIS IS NOT A SECRET"

# Sendgrid credentials
SENDGRID_API_KEY="RANDOM SENDGRIP API KEYS"
SENDGRID_FROM_EMAIL="YOUR EMAIL"

# Email credentials
EMAIL_HOST='MAIL.YOURSMPTSERER.COM'
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_AUTH_USER='MAIL@YOURSMTPSERVER.COM'
EMAIL_AUTH_PASS='YOUR EMAIL PASSWORD'
```

After setting up your `.env` file, set your postgres user credentials within `configureDaatabase.sh`

# Development

0. `git clone https://github.com/wajeht/training-vlog.git` to download this repo
1. `npm run configure` to to set up database and table
2. `npm install` to install npm packages
3. `npm run dev` to launch the app in dev environment
4. `npm run start` to launch the app
5. visit `localhost:6969` or whatever port you set in the browser to visit the site

# Contribute

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

# License

Distributed under the MIT License © [wajeht](https://www.github.com/wajeht/). See LICENSE for more information.
