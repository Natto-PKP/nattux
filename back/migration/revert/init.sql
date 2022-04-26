-- Revert nattux:init from pg

BEGIN;

DROP TABLE "file", "folder", "desk", "account";

DROP DOMAIN name_text;

COMMIT;
