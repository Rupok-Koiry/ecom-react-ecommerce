import express from 'express';
import {
  createNewsletter,
  getAllNewsletters,
  getNewsletterDetails,
  updateNewsletter,
  deleteNewsletter,
} from './newsletter.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Newsletter Routes using router.route()
router.route('/').post(createNewsletter).get(auth('admin'), getAllNewsletters);

router
  .route('/:id')
  .get(auth('admin'), getNewsletterDetails)
  .patch(auth('admin'), updateNewsletter)
  .delete(auth('admin'), deleteNewsletter);

export default router;
