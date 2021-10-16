import { Exclude, Expose } from "class-transformer";
import { BaseUser } from "./BaseUser";

export class User extends BaseUser {

  @Exclude({ toPlainOnly: true })
  role: 'USER'
  
}