import jwt from "jsonwebtoken";

class TokenManager {
  private secretKey = process.env.JWT_SECRET || "cannotGuessThis";

  sign<T extends object>(data: T) {
    return jwt.sign(data, this.secretKey);
  }
  
}

export default TokenManager;
