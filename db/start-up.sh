#!/bin/bash

echo "Building Postgres DB Container"
docker build -t fullstack-todo/db .

echo "Creating Docker Volumes"
docker volume create --driver local --name=fullstack-todo-pgvolume
docker volume create --driver local --name=fullstack-todo-pga4volume

echo "Creating Docker Network"
docker network create --driver bridge fullstack-todo-pgnetwork

cat << EOF > pg-env.list
PG_MODE=primary
PG_PRIMARY_USER=postgres
PG_PRIMARY_PASSWORD=yoursecurepassword
PG_DATABASE=dev
PG_USER=yourusername
PG_PASSWORD=yoursecurepassword
PG_ROOT_PASSWORD=yoursecurepassword
PG_PRIMARY_PORT=5432
EOF

cat << EOF > pgadmin-env.list
PGADMIN_SETUP_EMAIL=youremail@yourdomain.com
PGADMIN_SETUP_PASSWORD=yoursecurepassword
SERVER_PORT=5050
EOF

docker run --publish 5432:5432 \
  --volume=fullstack-todo-pgvolume:/pgdata \
  --env-file=pg-env.list \
  --name="fullstack-todo-postgres" \
  --hostname="fullstack-todo-postgres" \
  --network="fullstack-todo-pgnetwork" \
  --detach \
fullstack-todo/db

docker run --publish 5050:5050 \
  --volume=fullstack-todo-pga4volume:/var/lib/pgadmin \
  --env-file=pgadmin-env.list \
  --name="fullstack-todo-pgadmin4" \
  --hostname="fullstack-todo-pgadmin4" \
  --network="fullstack-todo-pgnetwork" \
  --detach \
crunchydata/crunchy-pgadmin4:centos7-10.9-2.4.1