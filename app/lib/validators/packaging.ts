import Joi from "joi";

const packagingValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Package Name is required.",
    "string.min": "Package Name must be at least 2 characters.",
    "string.max": "Package Name must not exceed 100 characters.",
  }),
  height: Joi.number().positive().required().messages({
    "number.base": "Package Height must be a number.",
    "number.positive": "Package Height must be a positive number.",
    "any.required": "Package Height is required.",
  }),
  width: Joi.number().positive().required().messages({
    "number.base": "Package Width must be a number.",
    "number.positive": "Package Width must be a positive number.",
    "any.required": "Package Width is required.",
  }),
  length: Joi.number().positive().required().messages({
    "number.base": "Package Length must be a number.",
    "number.positive": "Package Length must be a positive number.",
    "any.required": "Package Length is required.",
  }),
  weight: Joi.number().positive().required().messages({
    "number.base": "Package Weight must be a number.",
    "number.positive": "Package Weight must be a positive number.",
    "any.required": "Package Weight is required.",
  }),
  wrapper: Joi.string()
    .valid("box", "soft-packaging", "envelope")
    .required()
    .messages({
      "any.only":
        "Wrapper Type must be one of 'box', 'soft-packaging', or 'envelope'.",
      "any.required": "Wrapper Type is required.",
    }),
});

export default packagingValidationSchema;

export const validatePackaging = (packaging: PackagingType) => {
  const { error } = packagingValidationSchema.validate(packaging, {
    abortEarly: false, // Collect all errors
  });

  if (error) {
    // Map errors to an object with field names as keys
    const errorMessages = error.details.reduce(
      (acc, err) => {
        const fieldName = err.path[0]; // Get the field name
        acc[fieldName] = err.message; // Map the error message to the field name
        return acc;
      },
      {} as Record<string, string>,
    );

    return errorMessages;
  }

  return null; // No errors
};
