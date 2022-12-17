const router = require("express").Router();

const user = require("../controllers/user.controller");
const { authentication, authAdmin, authorization } = require('../middlewares/auth')

router.post("/sign-in",user.signIn);
router.post("/", user.create);

router.use(authentication)
router.get("/personal",authorization, user.getByIdForUser);
router.get("/",authAdmin, user.fetch);
router.get("/:userID",authAdmin, user.getByIdAFordmin);
router.patch("/:id",authAdmin, user.update);
router.delete("/:idUser",authAdmin, user.destroy);

module.exports = router;
