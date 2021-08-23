const {Router} = require('express');
const router = Router();

const memberComponent = require('../../core/component/member');

router.get('/',
    (req, res) => {
        const data = memberComponent.findMembers();
        res.send(data);
    });

router.get('/:memberId',
    (req, res) => {
    const memberId = req.params.memberId;
    const data = memberComponent.getMembers(memberId);
        res.send(data);
    });

module.exports = router;
