import { IUserRepository } from "./repository";

class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createAccount() {

  }
  
}