#!/bin/bash

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