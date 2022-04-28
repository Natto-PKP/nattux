-- Deploy nattux:init to pg

BEGIN;

CREATE DOMAIN name_text AS text CHECK (
  VALUE ~ '^[\w\-.0-9]*$' AND LENGTH(VALUE) >= 2 AND LENGTH(VALUE) <= 32
);

-- account
CREATE TABLE "account" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" NAME_TEXT NOT NULL,
  "discriminator" TEXT NOT NULL CHECK ( "discriminator" ~ '^\d{4}$' ),
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "avatar" TEXT,
  UNIQUE ("pseudo", "discriminator")
);

-- desk
CREATE TABLE "desk" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "background" TEXT,
  "theme" TEXT NOT NULL DEFAULT 'default',
  "color" TEXT CHECK ( LENGTH("color") = 7 AND "color" ~ '^#[0-9a-fA-F]{6}$' ),
  "account_id" INTEGER NOT NULL UNIQUE REFERENCES "account"("id") ON DELETE CASCADE
);

-- folder
CREATE TABLE "folder" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" NAME_TEXT NOT NULL,
  "icon" TEXT NOT NULL DEFAULT 'default',
  "favorite" BOOLEAN NOT NULL DEFAULT false,
  "account_id" INTEGER NOT NULL REFERENCES "account"("id") ON DELETE CASCADE,
  "folder_id" INTEGER REFERENCES "folder"("id") ON DELETE CASCADE
);

-- file
CREATE TABLE "file" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" NAME_TEXT NOT NULL,
  "type" TEXT NOT NULL DEFAULT 'text' CHECK ( "type" ~ '(text|markdown)' ),
  "content" TEXT,
  "favorite" BOOLEAN NOT NULL DEFAULT false,
  "account_id" INTEGER NOT NULL REFERENCES "account"("id") ON DELETE CASCADE,
  "folder_id" INTEGER REFERENCES "folder"("id") ON DELETE CASCADE
);

COMMIT;
