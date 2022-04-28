import joi from 'joi';

export default {
  createOne: joi.object({
    email: joi.string().email().required(),
    pseudo: joi.string().pattern(/^[\w\-.0-9]*$/).min(2).max(32)
      .required(),
    password: joi.string().required(),
  }).length(3).required(),

  connect: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }).length(2).required(),

  updateOne: joi.object({
    email: joi.string().email(),
    pseudo: joi.string().pattern(/^[\w\-.0-9]*$/).min(2).max(32),
    avatar: joi.any(),
    password: joi.string(),
  }).min(1).max(4).required(),
};
