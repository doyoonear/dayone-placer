const { Router } = require('express');
const router = Router({ mergeParams: true });

router.post('/sign-in', (req, res, next) => {
  const email = req.body?.email;
  const password = req.body?.password;

  console.log('email', email);
  console.log('password', password);

  // const principal = await signIn(email, password);
  // const accessToken = generateAccessToken(principal);
  const accessToken = 'foo';

  res.send({ accessToken });
});

module.exports = router;
