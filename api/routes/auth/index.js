const { Router } = require("express");
const router = Router({ mergeParams: true });

const { signIn } = require("../../core/component/auth");

router.post("/sign-in", async (req, res, next) => {
  const email = req.body?.email;
  const password = req.body?.password;

  console.log("email", email);
  console.log("password", password);

  const accessToken = await signIn(email, password);

  res.send({ accessToken });
});

module.exports = router;
