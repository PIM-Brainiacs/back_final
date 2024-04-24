import createError from "http-errors";


export async function notFoundError(req,res,next) {
    next(createError.NotFound("This route does not exist"));

};


export function errorHandler(err, req, res, next) {
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
}