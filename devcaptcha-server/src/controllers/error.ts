import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err) {
    console.error(err.stack);
    res.sendStatus(500);
  }
}

export default errorHandler;