let code, status, message;

exports.errorHandler = (err,req, res, next) => {
    switch (err.status) {
        case 'Forbidden':
          code = 403;
          status = err.status ;
          message = err.message;
          break;

        case 'Conflict':
          code = 409;
          status = err.status;
          message = err.message;
          break;

        case 'Gone':
          code = 410;
          status = err.status ;
          message = err.message;
          break;

        case 'Bad Request':
          code = 400;
          status = err.status ;
          message = err.message;
          break;

        case 'Unauthorize':
          code = 401;
          status = err.status ;
          message = err.message;
          break;

        case 'Not Found':
          code = 404;
          status = err.status;
          message = err.message;
          break;

        case 'Unprocessable Entity': 
          code = 422;
          status = err.status;
          message = err.message;
          break;
          
        default :
          code = 500;
          status = 'Internal Server Error';
          message = err.message
      }

      if(err.errors) {
        code = 400,
        status = "Bad Requests"
        message = err.errors.Status.message
      }
      return res.status(code).json({
        code,
        status,
        message,
      });
};