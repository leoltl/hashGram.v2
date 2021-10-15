import { Exclude, Expose } from "class-transformer";
import { BaseUser } from "./BaseUser";

export class Admin extends BaseUser {
  
  id: string;
  
  email: string;
  
  name: string | null;
  
  @Exclude({ toPlainOnly: true })
  isDeleted: boolean;
  
  @Expose({ groups: ['auth']})
  passwordHash: string;

  @Exclude({ toPlainOnly: true })
  role: 'ADMIN'

  @Exclude({ toPlainOnly: true })
  createdAt: Date;
}