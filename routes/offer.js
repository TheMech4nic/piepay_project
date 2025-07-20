const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offer');

router.post('/', offerController.createOffers);
router.get('/highest-discount', offerController.getHighestDiscount);

module.exports = router;
