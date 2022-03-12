const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// ----------------------------------------------------------------
// exports.getAllUsers = catchAsync(async (req, res, next) => {
//   const users = await User.find();
//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// });
// => To this:
exports.getAllUsers = factory.getAll(User);
// exports.getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not defined',
//   });
// };

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create a error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password update. Please use /updateMyPassword',
        400
      )
    );
  // 2) If not simply update the user document
  // 2-1) Filtered out unwanted fields names that are not allow to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 2-2) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// ----------------------------------------------------------------
// Delete User document
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// ----------------------------------------------------------------
// exports.getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not defined',
//   });
// };

exports.getUser = factory.getOne(User);
// ----------------------------------------------------------------
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is  defined! Please use /signup instead.',
  });
};

// ----------------------------------------------------------------
// => From this To Factory Update =>
// exports.updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'this route is not defined',
//   });
// };
// => to this:
exports.updateUser = factory.updateOne(User);

// ----------------------------------------------------------------
exports.deleteUser = factory.deleteOne(User);
