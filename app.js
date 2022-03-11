const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
// GLOBAL MIDDLEWARES

if (process.env.NODE_ENV !== 'development') {
  app.use(morgan('dev'));
}
// limit for 100 request and time limit for windows 1 hour for resent IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in an hour',
});
app.use('/api', limiter);
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('hello from the middleware');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  //! After AppError
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// CREATING ERROR HANDLING MIDDLEWARE
// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });
//! after errorController js
app.use(globalErrorHandler);
module.exports = app;
