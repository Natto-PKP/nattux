import joi from 'joi';

const theme = joi.string().pattern(/default/).default('default');
const color = joi.string().pattern(/#[0-9a-fA-F]{6}/);

export default {
  createOne: joi.object({
    theme: theme.required(),
    color,
  }).min(1).max(2).required(),

  updateOne: joi.object({
    background: joi.any(),
    theme,
    color,
  }).min(1).max(3).required(),
};
