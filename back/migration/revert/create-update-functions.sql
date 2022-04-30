-- Revert nattux:create-update-functions from pg

BEGIN;

DROP FUNCTION create_account(json);
DROP FUNCTION update_account(json, integer);

DROP FUNCTION create_desk(json, integer);
DROP FUNCTION update_desk(json, integer, integer);

DROP FUNCTION create_folder(json, integer);
DROP FUNCTION update_folder(json, integer, integer);

DROP FUNCTION create_file(json, integer);
DROP FUNCTION update_file(json, integer, integer); 

COMMIT;
