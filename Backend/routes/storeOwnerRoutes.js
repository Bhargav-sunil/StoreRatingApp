const router = require('express').Router();
const owner = require('../controllers/storeOwnerController');
const { protect, authorize } = require('../middleware/authMiddleware');

//Middleware
router.use(protect, authorize('Store Owner'));

router.get('/ratings', owner.viewRatings);
router.get('/average', owner.averageRating);
router.post('/add-store', owner.addStore);

module.exports = router;
