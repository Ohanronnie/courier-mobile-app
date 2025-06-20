import Joi from "joi";

const parcelValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Product Name is required.",
    "string.min": "Product Name must be at least 2 characters.",
    "string.max": "Product Name must not exceed 100 characters.",
  }),
  description: Joi.string().max(500).required().messages({
    "string.empty": "Product Description is required.",
    "string.max": "Product Description must not exceed 500 characters.",
  }),
  weight: Joi.number().positive().required().messages({
    "number.base": "Weight must be a number.",
    "number.positive": "Weight must be a positive number.",
    "any.required": "Weight is required.",
  }),
  quantity: Joi.number().integer().positive().required().messages({
    "number.base": "Quantity must be a number.",
    "number.integer": "Quantity must be an integer.",
    "number.positive": "Quantity must be a positive number.",
    "any.required": "Quantity is required.",
  }),
  value: Joi.number().positive().required().messages({
    "number.base": "Product Value must be a number.",
    "number.positive": "Product Value must be a positive number.",
    "any.required": "Product Value is required.",
  }),
  currency: Joi.string().length(3).uppercase().required().messages({
    "string.empty": "Currency is required.",
    "string.length": "Currency must be a 3-character code (e.g., USD).",
    "string.uppercase": "Currency code must be uppercase.",
  }),
  type: Joi.string().valid("parcel", "document").required().messages({
    "any.only": "Product Type must be either 'parcel' or 'document'.",
    "any.required": "Product Type is required.",
  }),
});

const parcelsValidationSchema = Joi.array()
  .items(parcelValidationSchema)
  .min(1)
  .messages({
    "array.min": "At least one parcel must be added.",
  });

// Function to validate and map errors
export const validateParcels = (parcels: any[]) => {
  const { error } = parcelsValidationSchema.validate(parcels, {
    abortEarly: false, // Collect all errors
  });

  if (error) {
    // Initialize an array to hold errors for each parcel
    const parcelErrors: Array<Record<string, string>> = [];

    // Iterate through the errors and group them by parcel index
    error.details.forEach((err) => {
      const [index, field] = err.path; // Extract the parcel index and field name
      if (!parcelErrors[index as any]) {
        parcelErrors[index as any] = {}; // Initialize an object for the parcel if it doesn't exist
      }
      parcelErrors[index as any][field] = err.message; // Assign the error message to the field
    });

    return parcelErrors;
  }

  return []; // No errors
};

export default parcelsValidationSchema;
