import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const ACCESS_TOKEN_EXPIRATION = "20m"; // Adjust as needed
//const REFRESH_TOKEN_EXPIRATION = '30m'; // Adjust as needed

const signToken = (payload: { id: string }) => {
  const options = {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export { signToken, verifyToken };
