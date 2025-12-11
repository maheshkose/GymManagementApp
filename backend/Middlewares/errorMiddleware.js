

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (err.statusCode === 1100) {
        err.message = 'Duplicate Key Error';
        err.statusCode = 400;
    }
    if (err.name === 'ValidationError') {
        err.message = Object.values(err.errors).map(value => value.message).join(', ');
        err.statusCode = 400;
    }
        if (err.name === 'CastError') {
        err.message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
        }

        if (err.name === 'JsonWebTokenError') {
        err.message = 'JSON Web Token is invalid, try again';
        err.statusCode = 400;
        }
        if (err.name === 'TokenExpiredError') {
        err.message = 'JSON Web Token is expired, try again';
        err.statusCode = 400;
        }
        if (err.name === "Network Error") {
             err.message = 'Network Error';
        err.statusCode = 500;
        }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
}

export default errorMiddleware;