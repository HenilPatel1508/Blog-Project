const router = require("express").Router();
const blogController = require("../controllers/blogController");
const upload = require("../util/fileUpload");
const {verifyUserToken, IsUser} = require("../config/auth")

router.post("/",verifyUserToken,IsUser, upload.single("blog_image"), blogController.create);

module.exports = router;