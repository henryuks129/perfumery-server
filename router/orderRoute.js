const express = require('express');
const router = express.Router();
const {create_order_controller} = require('../controller/orderController');
const auth = require('../middleware/auth');

router.post('/create',auth,create_order_controller)

module.exports = router