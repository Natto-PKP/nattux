-- Revert nattux:basic-views from pg

BEGIN;

DROP VIEW "desk_view", "folder_view", "file_view";

COMMIT;
