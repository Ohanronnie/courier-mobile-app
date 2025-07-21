import Joi from "joi";
export const addressValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "First name is required.",
    "string.min": "First name must be at least 2 characters.",
    "string.max": "First name must not exceed 50 characters.",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Last name is required.",
    "string.min": "Last name must be at least 2 characters.",
    "string.max": "Last name must not exceed 50 characters.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  addressLine1: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Address Line 1 is required.",
    "string.min": "Address Line 1 must be at least 5 characters.",
    "string.max": "Address Line 1 must not exceed 100 characters.",
  }),
  addressLine2: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Address Line 2 must not exceed 100 characters.",
  }),
  phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required.",
      "string.pattern.base": "Phone number must be between 10 and 15 digits.",
    }),
  city: Joi.string().min(2).max(50).required().messages({
    "string.empty": "City is required.",
    "string.min": "City must be at least 2 characters.",
    "string.max": "City must not exceed 50 characters.",
  }),
  state: Joi.string().min(2).max(50).required().messages({
    "string.empty": "State is required.",
    "string.min": "State must be at least 2 characters.",
    "string.max": "State must not exceed 50 characters.",
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country is required.",
    "string.length": "Country must be a 2-character code.",
    "string.uppercase": "Country code must be uppercase.",
  }),

  countryName: Joi.string().required().messages({
    "string.empty": "Country is required.",
    "string.length": "Country must be a 2-character code.",
    "string.uppercase": "Country code must be uppercase.",
  }),
  callingCode: Joi.string()
    .pattern(/^\d{1,4}$/)
    .optional()
    .allow("")
    .messages({
      "string.pattern.base": "Calling code must be 1 to 4 digits.",
    }),
  // Postal code validation for 4 to 10 digits
  postalCode: Joi.string()
    .pattern(/^\d{4,10}$/)
    .required()
    .messages({
      "string.empty": "Postal Code is required.",
      "string.pattern.base": "Postal Code must be between 4 and 10 digits.",
    }),
});
