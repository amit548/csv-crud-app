import { RequestHandler } from 'express';

import User from '../models/useModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const users = User.getUsers();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const getUser: RequestHandler = catchAsync(async (req, res) => {
  const user = User.getUser(req.params);

  if (!user) throw new AppError('User not found', 404);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const user = User.createUser(req.body);

  if (!user) throw new AppError('User not found', 404);

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const user = User.updateUser({ ...req.body, ...req.params });

  if (!user) throw new AppError('User not found', 404);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const user = User.deleteUser(req.params);

  if (!user) throw new AppError('User not found', 404);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
