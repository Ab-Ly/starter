// seperate routes from app.js to specific routes single file.js
const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router(); // creating router must change app with tourRouter

router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
