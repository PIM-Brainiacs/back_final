import Joi from "joi";

const loginSchema = Joi.object({
    email: Joi.string().min(3).lowercase().required(),
    password: Joi.string().min(6).required().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/),
});

export default loginSchema;