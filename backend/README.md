# Instructions:

## setup database:
### win10+:
link: https://www.postgresql.org/download/windows/
download postgresql on your device and create database and user with the corresponding name and password:
- database name: hesha
- user name: hesha
- user password: 123123
- command: GRANT ALL PRIVILEGES ON DATABASE hesha TO hesha;

Please modify .env file if your going to change DB name and db user Name

### linux:
please refer to --> https://www.postgresql.org/download/linux/.

create database and user with the corresponding name and password:
- database name: hesha
- user name: hesha
- user password: 123123
- command: GRANT ALL PRIVILEGES ON DATABASE hesha TO hesha;

Please modify .env file if your going to change DB name and db user Name
### After DB Creation:
please run this command to insert product tables
- npm run migrate

## ports:

### database port:
    5432


### backend port:
    5000


## install packages (dependencies):

open directory/file in terminal and npm install.
cd to build_storefront_backend npm install.

## run migrations to create tables:
- db-migrate up
- npx db-migrate up

## create .env file:
create environment file and write 
 -  POSTGRES_HOST = localhost
 -  POSTGRES_DB = node_js
 -  POSTGRES_USER = hesha
 -  POSTGRES_PASSWORD = 123123
 -  TEST_DB = test_db
 -  ENVI = dev
 -  BCRYPT_PASSWORD = HESHAM-AMOUDI-CRYPTING
 -  SALT_ROUND=10
 -  TOKEN_SECRET=ALOHESHAMamoudi
 -  TEST_TOKEN= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNiwiZmlyc3RfbmFtZSI6Im1lc2hvIiwibGFzdF9uYW1lIjoiYW1vdWRpIiwidXNlcm5hbWUiOiJoZXNoYW0iLCJwYXNzd29yZCI6IiQyYiQxMCQxOXBQZ2oxSXVxQTJSS0dXQm13VU8uLjJNS082dFdoVlRHYnRXQk05TGlZUGVnSDJEVlg4QyJ9LCJpYXQiOjE2NTA3MTk2Mjl9.nO-5mXWAQYPo1ucqwkhDXtVwmTsRiLb_gzLWWMFwu9I

  ## create authintication for jwt
  - create a private key file for encryption private.pem
    - command: openssl genrsa -out private.pem 2048
  - create a public key file for encryption public.pem
    - command: openssl rsa -in private.pem -outform PEM -pubout -out public.pem







