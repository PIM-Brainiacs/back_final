import Joi from "joi";


const authSchema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    username: Joi.string().min(3).lowercase().required(),
    password: Joi.string().min(6).required().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/),
    email: Joi.string().email().lowercase().required(),
    phoneNumber: Joi.string().required(),
   // profilePic: Joi.string(),
    role: Joi.string().valid("ADMIN", "AUTISTE", "DOCTOR").required(),
    
    
});

export default authSchema;

