import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as authController from "../controllers/authController";

let router = express.Router();

// user create router
router.post("/auth", async (req, res) => {
  let error = Schemas.authObjValidation(req.body);
  if (error !== null) {
    return res.send(`${error.name} : ${error.details[0].message}`);
  }
  let userToken = await authController.validateUser(
    req.body.password,
    req.body.email
  );
  if (userToken) {
    return res
      .status(200)
      .header("x-auth-token", userToken)
      .send("User is authenticated.");
  } else {
    return res.status(400).send("Invalid username or password.");
  }
});

export default router;
