#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;
    REVOKE ALL ON DATABASE graphql_service_db FROM PUBLIC;
    CREATE SCHEMA graphql_db_schema;
    GRANT USAGE, CREATE ON SCHEMA graphql_db_schema TO graphql_service_db_user;
    ALTER DEFAULT PRIVILEGES IN SCHEMA graphql_db_schema GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO graphql_service_db_user;
    ALTER USER graphql_service_db_user SET search_path TO graphql_db_schema;
EOSQL