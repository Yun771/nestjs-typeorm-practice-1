CREATE USER yun WITH SUPERUSER PASSWORD 'password';


CREATE DATABASE iwilldoit;
GRANT ALL PRIVILEGES ON DATABASE iwilldoit TO yun;
GRANT ALL PRIVILEGES ON SCHEMA public TO yun;