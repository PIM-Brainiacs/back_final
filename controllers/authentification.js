import createError from 'http-errors';


import User from '../models/user.js';
import authSchema from '../middlewares/auth-validator.js';
import loginSchema from '../middlewares/login-validator.js';

import { signAccessToken } from '../middlewares/token-manager.js';
import { signRefreshToken } from '../middlewares/token-manager.js';
import { verifyRefreshToken } from '../middlewares/token-manager.js';

export async function registerUser(req, res, next) {

    try {
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            phoneNumber,
            role,
            archived,
        } = req.body;

        const result = await authSchema.validateAsync(req.body);
        //console.log(result);

        if (!firstName || !lastName || !username || !password || !email || !phoneNumber || !role ) {
            throw createError.BadRequest();
        }

       

        const userAlreadyExists = await User.findOne({ username: result.username });
        if (userAlreadyExists) {
            throw createError.Conflict(`${result.username} is already registered`);
        }

        const emailAlreadyExists = await User.findOne({ email: result.email });
        if (emailAlreadyExists) {
            throw createError.Conflict(`${result.email} is already registered`);
        }

        const user = new User(result);
        const savedUser = await user.save();

        //Access token
        const accessToken = await signAccessToken(savedUser.id);
        //Refresh token
        const refreshToken = await signRefreshToken(savedUser.id);

      //  res.send({ accessToken, refreshToken });

        //Send welcome email
      //  await sendWelcomeEmail(savedUser);

        res.json({user:savedUser,accessToken:accessToken});
    } catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
}



export async function loginUser(req, res, next) {
    try {
        console.log(req.body)
        const result = await loginSchema.validateAsync(req.body);

        const user = await User.findOne({ email: result.email });

        if (!user) throw createError.NotFound("User not registered");

        console.log(user);

        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized("Username/password not valid");

        //Access token
        const accessToken = await signAccessToken(user.id);
        //Refresh token
        const refreshToken = await signRefreshToken(user.id);

        res.json(user);

       // res.send({ accessToken, refreshToken });


    } catch (error) {
        if (error.isJoi === true)
            return next(createError.BadRequest("Invalid email or password"));
        next(error);
    }
}





export async function registerAutiste(req, res, next) {
    try {
        const {
            autisteName,
            username,
            password,
            email,
            phoneNumber,
            role,
            description,
            address,
            archived,
        } = req.body;

        const result = await authSchema.validateAsync(req.body);
        console.log(result);


        if (!autisteName || !username || !password || !email || !phoneNumber || !role || !description || !address || archived === undefined) {
            throw createError.BadRequest();
        }

        if (role !== 'autiste') {
            throw createError.BadRequest("role must be autiste");
        }

        const userAlreadyExists = await User.findOne({ username: result.username });
        if (userAlreadyExists) {
            throw createError.Conflict(`${result.username} is already registered`);
        }

        const emailAlreadyExists = await User.findOne({ email: result.email });
        if (emailAlreadyExists) {
            throw createError.Conflict(`${result.email} is already registered`);
        }


        const autiste = new autiste(result);
        const savedautiste = await autiste.save();

        //Send welcome email
        await sendWelcomeEmail(savedautiste);

        res.send(savedautiste);
    } catch (error) {
        if (error.isJoi === true) {
            error.status = 422;
        }
        next(error);
    }
}


export async function refreshToken(req, res, next) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refreshToken);

        const newAccessToken = await signAccessToken(userId);
        const newRefreshToken = await signRefreshToken(userId);

        res.send({ accessToken: newAccessToken, refreshToken: newRefreshToken })

    } catch (error) {
        next(error)
    }
}

//todo

// export async function logout(req, res, next) {
//     try {
//         const { refreshToken } = req.body;
//         if (!refreshToken) throw createError.BadRequest();
//         const userId = await verifyRefreshToken(refreshToken);

//     } catch (error) {
//         next(error);
//     }
// }

















//************************************************************************************************************/

async function sendWelcomeEmail(user) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "ecocircuit.tn@gmail.com",
            pass: "grpi udos qrki gcbx",
        },
    });

    let mailOptions = {
        from: "Ecocircuit team",
        to: user.email,
        subject: "Welcome to Ecocircuit",
        text: `Welcome to Ecocircuit ${user.username}! `,
        html: `<!doctype html>
<html lang="en-US">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Welcome Email Template</title>
    <meta name="description" content="Welcome Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>
<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #ffffff;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#ffffff"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #ffffff; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <img src="/public/images/logo.png" alt="Logo" style="max-width: 200px;">
                            <h1 style="color:#2a4d69; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Welcome to <b> Ecocircuit </b></h1>
                            <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                Thank you for joining our platform. We are excited to have you as a member of our community.
                            </p>
                            <a href="#" style="background:#0dcaf0;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Get Started</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>
</html>
`,
    };
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}


