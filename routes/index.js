const router = require("express").Router();
const UserRoute = require("./user.router");

router.use("/user", UserRoute);

module.exports = router;
