-- Deploy nattux:basic-views to pg

BEGIN;

CREATE VIEW "desk_view" AS 
  SELECT 
    "id",
    "background",
    "theme",
    "color",
    "account_id" AS "userId"
  FROM "desk";

CREATE VIEW "folder_view" AS 
  SELECT 
    "id",
    "name",
    "icon",
    "favorite",
    "account_id" AS "userId",
    "folder_id" AS "folderId"
  FROM "folder";

CREATE VIEW "file_view" AS 
  SELECT
    "id",
    "name",
    "type",
    "favorite", 
    "content",
    "account_id" AS "userId",
    "folder_id" AS "folderId"
  FROM "file";

COMMIT;
