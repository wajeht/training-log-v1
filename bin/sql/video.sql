\echo 'creating "video" table'
CREATE TABLE videos (
    id          	SERIAL PRIMARY KEY NOT NULL,
    date        	TIMESTAMP NOT NULL, 
    "videoUrl"  	CHARACTER VARYING(1000) NOT NULL,
	"screenshotUrl" CHARACTER VARYING(1000),
    title      		CHARACTER VARYING(1000) NOT NULL,
    message    		CHARACTER VARYING(1000) NOT NULL,
    "userId"    	INTEGER NOT NULL
);
\echo
