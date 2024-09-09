const jwt = require("jsonwebtoken");
exports.verifyUserToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.send("Access Denied / Unauthorized request");
    }
    console.log("data" + token);
    
      let verifyuser = jwt.verify(token, "henil1508");
      if (!verifyuser) {
        res.send({ error: "Unauthorized request" });
      } else {
        console.log(verifyuser);
        req.admin = verifyuser;
        next();
      }
    
  } catch (error) {
    console.log(error);
  }
};

exports.IsUser = async (req, res, next) => {
  if (req.admin.adminrole === 1) {
      next();
  } else {
      return res.status(401).send("Unauthorized!");

  }
}

