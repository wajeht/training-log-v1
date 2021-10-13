#!/bin/bash

# Making folders for uploads
echo "$(tput setaf 100)Making folders to store videos and thumbnails"
echo "--------------------------------------------"
if [ ! -d ../data/uploads ] || [ ! -d ../data/uploads/thumbnails ]
then
  echo "Creating 'upload' folder"
  mkdir -p ./data/uploads;

  echo "Creating 'thumbnails' folder"
  mkdir -p ./data/uploads/thumbnails;
fi
echo ""



# Delete old videos and thumbnails
echo "$(tput setaf 125)cleaning uploaded files"
echo "--------------------------------------------"
echo "Deleting old videos"
rm ./data/uploads/*mp4

echo "Deleting old videos thumnail"
rm ./data/uploads/thumbnails/*png
rm ./data/uploads/thumbnails/*jpg
rm ./data/uploads/thumbnails/*jpeg

echo "Deleting old profile pictures"
rm ./data/uploads/*png
rm ./data/uploads/*jpg
echo ""



source "$(dirname "$0")/.pg_password.sh" # bring in .env file that contains pgpassword
export PGPASSWORD=$DB_PASSWORD # set the pg password as the password form .env file so we don't have to enter it

database="trainingvlog"

echo "$(tput setaf 3)configuring database"
echo "--------------------------------------------"

dropdb -U node_user $database
echo "dropped $database database"

createdb -U node_user $database
echo "created $database database"
echo ""

psql -U node_user trainingvlog < ./bin/sql/video.sql
psql -U node_user trainingvlog < ./bin/sql/user.sql
psql -U node_user trainingvlog < ./bin/sql/comment.sql
psql -U node_user trainingvlog < ./bin/sql/session.sql
psql -U node_user trainingvlog < ./bin/sql/seed.sql

echo "--------------------------------------------"
echo "database has been conigured"
echo ""

