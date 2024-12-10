import { validationResult } from "express-validator";

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const results = validationResult(req);
    if (results.isEmpty()) {
      return next();
    }
    return res.status(400).json({ error: results.array() });
  };
};

export default validate;
