-- Deploy nattux:create-update-functions to pg

BEGIN;

-- account
CREATE FUNCTION create_account (json) RETURNS account AS $$
  INSERT INTO "account" ("pseudo", "discriminator", "email", "password") VALUES (
    $1->>'pseudo', $1->>'discriminator', $1->>'email', $1->>'password'
  ) RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_account (json, integer) RETURNS account AS $$
  UPDATE "account" SET
    "pseudo" = COALESCE($1->>'pseudo', "pseudo"),
    "email" = COALESCE($1->>'email', "email"),
    "password" = COALESCE($1->>'password', "password"),
    "avatar" = CASE 
      WHEN $1->>'avatar' = 'deleted' 
        THEN NULL 
        ELSE COALESCE($1->>'avatar', "avatar") 
    END
  WHERE "id" = $2
  RETURNING *;
$$ LANGUAGE SQL STRICT; 

-- desk
CREATE FUNCTION create_desk (json, integer) RETURNS desk_view AS $$
  INSERT INTO "desk" ("theme", "color", "account_id") VALUES (
    $1->>'theme', $1->>'color', $2
  ) RETURNING "id", "background", "theme", "color", "account_id" AS "accountId";
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_desk (json, integer, integer) RETURNS desk_view AS $$
  UPDATE "desk" SET
    "background" = CASE
      WHEN $1->>'background' = 'deleted'
        THEN NULL
        ELSE COALESCE($1->>'background', "background")
    END,
    "theme" = COALESCE($1->>'theme', "theme"),
    "color" = CASE
      WHEN $1->>'color' = 'deleted'
        THEN NULL
        ELSE COALESCE($1->>'color', "color")
    END
  WHERE "id" = $2 AND "account_id" = $3
  RETURNING "id", "background", "theme", "color", "account_id" AS "accountId";
$$ LANGUAGE SQL STRICT;

-- folder
CREATE FUNCTION create_folder (json, integer) RETURNS folder_view AS $$
  INSERT INTO "folder" ("name", "icon", "folder_id", "account_id") VALUES (
    $1->>'name', $1->>'icon', ($1->>'folderId')::integer, $2
  ) RETURNING "id", "name", "icon", "favorite", "account_id" AS "accountId", "folder_id" AS "folderId";
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_folder (json, integer, integer) RETURNS folder_view AS $$
  UPDATE "folder" SET 
    "name" = COALESCE($1->>'name', "name"),
    "icon" = COALESCE($1->>'icon', "icon"),
    "favorite" = COALESCE(($1->>'favorite')::boolean, "favorite"),
    "folder_id" = CASE
      WHEN ($1->>'folderId')::integer = 0
        THEN NULL
        ELSE COALESCE(($1->>'folderId')::integer, "folder_id")
    END
  WHERE "id" = $2 AND "account_id" = $3
  RETURNING "id", "name", "icon", "favorite", "account_id" AS "accountId", "folder_id" AS "folderId";
$$ LANGUAGE SQL STRICT;

-- file
CREATE FUNCTION create_file (json, integer) RETURNS file_view AS $$
  INSERT INTO "file" ("name", "type", "content", "folder_id", "account_id") VALUES (
    $1->>'name', $1->>'type', $1->>'content', ($1->>'folderId')::integer, $2
  ) RETURNING "id", "name", "type", "content", "folder_id" AS "folderId", "account_id" AS "accountId";
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_file (json, integer, integer) RETURNS file_view AS $$
  UPDATE "file" SET
    "name" = COALESCE($1->>'name', "name"),
    "type" = COALESCE($1->>'type', "type"),
    "content" = COALESCE($1->>'content', "content"),
    "favorite" = COALESCE(($1->>'favorite')::boolean, "favorite"),
    "folder_id" = CASE
      WHEN ($1->>'folderId')::integer = 0
        THEN NULL
        ELSE COALESCE(($1->>'folderId')::integer, "folder_id")
    END
  WHERE "id" = $2 AND "account_id" = $3
  RETURNING "id", "name", "type", "content", "folder_id" AS "folderId", "account_id" AS "accountId";
$$ LANGUAGE SQL STRICT;

COMMIT;
