<p align="center"><img src="https://raw.githubusercontent.com/wajeht/training-vlog/main/public/images/screenshot_index.png" width="400"></p>

# <p align="center">training-vlog</p>

<p align="center"><em>❗❗❗ THIS PROJECT IS UNDNER DEVELOPMENT❗❗❗</em></p>

<p align="center">A full-stack web application to log taining videos from a 4 days split.</p>

# Motivation

Instagram is the best medium for powerlifters among other social media. Back in the day, YouTube used to be it. Ever since powerlifting has gotten popular, majority of the content usually reside on Instagram.

Instagram used to be really good before facebook bought it. Now it has gotta a lot worse with unrelated contents. It has also gotten a lot worse on the aspect of privacy. So I decided to ditch Instagram and build my own platform to log my training.

# Demo

I have a live prototye running at the link below.

```
https://tvl.jawstrength.com/
```

# Technology
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />‏‎ ‎‏‎ 
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> ‎‏‎ 
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />‏‎ ‎‏‎ 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> ‎‏‎ 
<img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" />‏‎ ‎‏‎ 



# Database configuration

Within this project I have include `.evn.example` file with secret credentials. Name that file to .env and put in proper credentials. And also make sure to install `postgresql` database and create proper account first.

```
PORT=0000
DB_HOST="localhost"
DB_USERNAME="username"
DB_PASSWORD="password"
DB_DATABASE="database"
DB_PORT=0000
COOKIE_SECRET="THIS IS NOT A SECRET"
```

After setting up your `.env` file, set your postgres user credentials within `configureDaatabase.sh`

# Development

0. `git clone https://github.com/wajeht/training-vlog.git` to download this repo
1. `npm run configure` to to set up database and table
2. `npm install` to install npm packages
3. `npm run dev` to launch the app in dev enviroment
4. `npm run start` to launch the app
5. visit `localhost:6969` or whatever port you set in the browser to visit the site

# Contribute

Let me know if you would contribute into this projects. Fork it and work on it on your own branch. Send me a pull request after. I will merge it.

0. `fork this repo`
1. `make new branch`
2. `send pull request`

# License

MIT © [wajeht](https://wajeht.github.io/)
