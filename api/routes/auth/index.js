const { Router } = require("express");
const router = Router({ mergeParams: true });

const { signIn } = require("../../core/service/auth");

router.post("/sign-in", async (req, res, next) => {
  // TODO: routes try-catch 함수 분리
  try {
    const email = req.body?.email;
    const password = req.body?.password;

    const accessToken = await signIn(email, password);

    res.send({ accessToken });
  } catch (err) {
    // TODO 401을 안에서 던질 수 있도록..
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
