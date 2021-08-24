const { Router } = require('express');
const router = Router();

const roomComponent = require('../../core/component/room');

router.get('/', (req, res) => {
  const data = roomComponent.findRoom();
  res.send(data);
});

router.get('/:roomId', (req, res) => {
  const data = roomComponent.getRoom();
  res.send(data);
});

module.exports = router;
