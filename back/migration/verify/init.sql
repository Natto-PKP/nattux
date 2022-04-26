-- Verify nattux:init on pg

BEGIN;

SELECT * FROM "account" WHERE false;

SELECT * FROM "desk" WHERE false;

SELECT * FROM "folder" WHERE false;

SELECT * FROM "file" WHERE false;

ROLLBACK;
