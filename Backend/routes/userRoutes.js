const router = require('express').Router();
const user = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

//Middleware
router.use(protect, authorize('Normal User'));

router.get('/stores', user.listStores);
router.get('/search', user.searchStores);
router.post('/rate', user.submitRating);

module.exports = router;
