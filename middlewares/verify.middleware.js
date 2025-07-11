import { verifyToken } from "../services/auth.service.js";
export const verifyAuthentication = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = await verifyToken(token);
    req.user = decodedToken;
  } catch (error) {
    req.user = null;
  }

  return next();
};
