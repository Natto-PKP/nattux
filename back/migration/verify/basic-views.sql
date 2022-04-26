-- Verify nattux:basic-views on pg

BEGIN;

SELECT * FROM "desk_view" WHERE false;

SELECT * FROM "folder_view" WHERE false;

SELECT * FROM "file_view" WHERE false;

ROLLBACK;
