#1/bin/bash

database="trainingvlog"

echo "$(tput setaf 3)configuring database"
echo "------------------------"

dropdb -U node_user $database
echo "dropped $database database"

createdb -U node_user $database
echo "created $database database"
echo ""

psql -U node_user trainingvlog < ./bin/sql/videos.sql
psql -U node_user trainingvlog < ./bin/sql/users.sql

echo "------------------------"
echo "database has been conigured"