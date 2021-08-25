const { Router } = require('express');
const router = Router();

const authRoutes = require('./auth');
const roomRoutes = require('./room');
const memberRoutes = require('./member');

router.use('/auth', authRoutes).use('/rooms', roomRoutes).use('/members', memberRoutes);

module.exports = router;
