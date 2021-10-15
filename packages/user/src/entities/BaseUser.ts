export interface BaseUser {
  
  id: string;
  
  email: string;
  
  name: string | null;
  
  isDeleted: boolean;
  
  passwordHash: string;

  createdAt: Date;

}