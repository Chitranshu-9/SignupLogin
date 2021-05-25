const router = require("express").Router();
const usersController = require('../controllers/userAuth');

router.get('/', (req, res) => {
    res.send('Hello');
})

router.get('/home', usersController.home);

router.use('/users', require('./users'));


module.exports = router;