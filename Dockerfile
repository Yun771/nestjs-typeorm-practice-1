FROM postgres:latest
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_PASSWORD=postgres
EXPOSE 5432

# restart unless-stopped