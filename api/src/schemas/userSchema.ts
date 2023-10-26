import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(3, {
        message: 'Name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Name must be at most 50 characters long',
      }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({
        message: 'Email must be a valid email address',
      })
      .min(3, {
        message: 'Email must be at least 3 characters long',
      })
      .max(50, {
        message: 'Email must be at most 50 characters long',
      }),
    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .regex(/^[0-9]{10}$/, {
        message: 'Phone number must be 10 digits',
      }),
    age: z
      .number({
        required_error: 'Age is requierd',
        invalid_type_error: 'Age must be a number',
      })
      .int({
        message: 'Age must be an integer',
      })
      .min(18, {
        message: 'Age must be at least 18',
      })
      .max(100, {
        message: 'Age must be at most 100',
      }),
    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be a string',
      })
      .min(3, {
        message: 'Address must be at least 3 characters long',
      })
      .max(50, {
        message: 'Address must be at most 50 characters long',
      }),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a string',
      })
      .uuid({
        message: 'User ID must be a valid UUID',
      }),
  }),
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(3, {
        message: 'Name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Name must be at most 50 characters long',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({
        message: 'Email must be a valid email address',
      })
      .min(3, {
        message: 'Email must be at least 3 characters long',
      })
      .max(50, {
        message: 'Email must be at most 50 characters long',
      })
      .optional(),
    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be a string',
      })
      .regex(/^[0-9]{10}$/, {
        message: 'Phone number must be 10 digits',
      })
      .optional(),
    age: z
      .number({
        required_error: 'Age is requierd',
        invalid_type_error: 'Age must be a number',
      })
      .int({
        message: 'Age must be an integer',
      })
      .min(18, {
        message: 'Age must be at least 18',
      })
      .max(100, {
        message: 'Age must be at most 100',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be a string',
      })
      .min(3, {
        message: 'Address must be at least 3 characters long',
      })
      .max(50, {
        message: 'Address must be at most 50 characters long',
      })
      .optional(),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a string',
      })
      .uuid({
        message: 'User ID must be a valid UUID',
      }),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a string',
      })
      .uuid({
        message: 'User ID must be a valid UUID',
      }),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];
export type UpdateUserParams = z.infer<typeof updateUserSchema>['params'];
export type DeleteUserParams = z.infer<typeof deleteUserSchema>['params'];
export type GetUserParams = z.infer<typeof getUserSchema>['params'];
