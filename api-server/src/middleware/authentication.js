import jwt from "jsonwebtoken";
import config from "config";

export async function authenticateRoute(req, res, next) {
  let reqToken = req.header("x-auth-token");
  if (!reqToken)
    return res.status(401).send("Unauthorized request, you need a token.");

  try {
    let decoded = await jwt.verify(reqToken, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token.");
  }
}
