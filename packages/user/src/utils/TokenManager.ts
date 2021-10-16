import jwt from "jsonwebtoken";
import { User as GqlUserType } from "../resolvers-types";
export class TokenManager {
  private secretKey = process.env.JWT_SECRET || "cannotGuessThis";

  sign<T extends GqlUserType>(user: T) {
    return jwt.sign(
      { name: user.name, email: user.email },
      this.secretKey,
      { 
        algorithm: "HS256",
        expiresIn: '10h',
        issuer: 'hashGram.v2',
        subject: user.id,
      },
    );
  }
};
