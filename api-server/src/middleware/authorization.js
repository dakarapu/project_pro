// this middleware works as authorization based on role level access
import jwt from "jsonwebtoken";
import config from "config";

const permissions = config.get("permissions");

// check the user and get jwt token
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

// check is user has permission for requested operation
export async function checkPermissions(req, res, next) {
  if (
    permissions.roles.hasOwnProperty(req.user.role) &&
    permissions.roles[req.user.role].includes(req.method)
  ) {
    req.user.userAccess = true;
    next();
  } else {
    res.status(403).send("Forbidden request.");
  }
}
