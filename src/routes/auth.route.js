const { Router } = require('express');
const { register, login, loguot, showUsers } = require('../controllers/auth.controller');
const { checkRole } = require('../middlewares/checkRole');
const router = Router();

router.post('/join/register', register);
router.post('/join/login', login);
router.delete('/loguot', loguot);
router.get('/users', checkRole, showUsers);

module.exports = router;
