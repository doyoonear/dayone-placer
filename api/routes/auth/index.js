const {Router} = require('express');
const router = Router();

router.get('/sign-in',
    (req, res) => {
        res.send({ status: 'ok' });
    });

module.exports = router;
