import { checkSchema } from "express-validator";

const itemSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "Required Field",
    },
    isString: {
      errorMessage: "Must be String",
    },
    escape: true,
  },
  category: {
    notEmpty: {
      errorMessage: "Required Field",
    },
    isString: {
      errorMessage: "Must be String",
    },
    escape: true,
  },
  quantity: {
    notEmpty: {
      errorMessage: "Required Field",
    },
    isInt: {
      errorMessage: "Only numeric quantity is allowed",
    },
    escape: true,
  },
  price: {
    notEmpty: {
      errorMessage: "Required Field",
    },
    isDecimal: {
      errorMessage: "Only decimal number is allowed",
    },
    escape: true,
  },
  description: {
    notEmpty: {
      errorMessage: "Required Field",
    },
    isString: {
      errorMessage: "Must be String",
    },
    escape: true,
  },
});

export default itemSchema;
