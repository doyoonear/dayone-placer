const { Router } = require("express");
const router = Router({ mergeParams: true });

const { signIn } = require("../../core/service/auth");

router.post("/sign-in", async (req, res, next) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;

    const result = await signIn(email, password);

    res.send(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
