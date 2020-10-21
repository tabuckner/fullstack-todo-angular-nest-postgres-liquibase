CREATE USER "yourusername" WITH PASSWORD 'yoursecurepassword';
CREATE DATABASE "dev" WITH OWNER "yourusername";
GRANT ALL PRIVILEGES ON DATABASE "dev" TO "yourusername";
\connect "dev";
CREATE SCHEMA app_schema AUTHORIZATION "postgres";
GRANT CREATE, USAGE ON SCHEMA app_schema TO "yourusername";
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app_schema to "yourusername";
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA app_schema to "yourusername";
