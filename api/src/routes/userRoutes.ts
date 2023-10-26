import { Router } from 'express';

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import validate from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema';

const router = Router();

router.route('/').get(getAllUsers).post(validate(createUserSchema), createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(validate(updateUserSchema), updateUser)
  .delete(deleteUser);

export default router;
