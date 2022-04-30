import joi from 'joi';

const name = joi.string().pattern(/[\w\-.0-9]*/).min(2).max(32);
const icon = joi.string().pattern(/default/);
const type = joi.string().pattern(/text|markdown/);
const folderId = joi.number().integer().positive();

export default {
  createOne: joi.object({
    name: name.required(),
    icon,
    folderId,
  }).min(1).max(3).required(),

  createFileInFolder: joi.object({
    name: name.required(),
    type,
    content: joi.string(),
  }).min(1).max(3).required(),

  updateOne: joi.object({
    name,
    icon,
    folderId,
    favorite: joi.boolean(),
  }).min(1).max(4).required(),
};
