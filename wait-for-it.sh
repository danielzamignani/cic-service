#!/bin/bash
# wait-for-it.sh

host="$1"
shift
cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD pg_isready -h "$host" -p 5432 -U "$POSTGRES_USER"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing migrations"
npm run migration:run

>&2 echo "Running command"
exec $cmd
