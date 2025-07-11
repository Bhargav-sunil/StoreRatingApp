const router = require('express').Router();
const admin = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

//Middleware
router.use(protect, authorize('System Administrator'));

router.post('/add-user', admin.addUser);
router.post('/add-store', admin.addStore);
router.get('/stats', admin.getStats);
router.get('/users', admin.listUsers);

module.exports = router;
