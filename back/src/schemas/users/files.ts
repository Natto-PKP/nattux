import joi from 'joi';

const name = joi.string().pattern(/[\w\-.0-9]*/).min(2).max(32);
const type = joi.string().pattern(/text|markdown/).default('text');
const folderId = joi.number().integer().positive();

export default {
  createOne: joi.object({
    name: name.required(),
    type,
    content: joi.string(),
    folderId,
  }).min(1).max(4).required(),

  updateOne: joi.object({
    name,
    type,
    content: joi.string(),
    favorite: joi.boolean(),
    folderId,
  }).min(1).max(5).required(),
};
