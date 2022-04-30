import joi from 'joi';

export default {
  createOne: joi.object({
    theme: joi.string().pattern(/default/).required(),
    color: joi.string().pattern(/#[0-9a-fA-F]{6}/),
  }).min(1).max(2).required(),

  updateOne: joi.object({
    background: joi.any(),
    theme: joi.string().pattern(/default/),
    color: joi.string().pattern(/#[0-9a-fA-F]{6}/),
  }).min(1).max(3).required(),
};
