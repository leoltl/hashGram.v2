import { Exclude, Expose } from "class-transformer";
import { BaseUser } from "./BaseUser";

export class Admin extends BaseUser {

  @Exclude({ toPlainOnly: true })
  role: 'ADMIN'
  
}