-- psql postgres
CREATE DATABASE passport;
-- ALTER DATABASE passport OWNER TO your-username;


CREATE TABLE "users" (
  "id" varchar(255) PRIMARY KEY,
  "username" varchar(255) UNIQUE,
  "password" varchar(100)
);
